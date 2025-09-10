import mongoose from "mongoose";
import app from "./app.js";
import dotenv from 'dotenv';
import { LogData, LogError } from "./Global_Helper/Global.js";
import connectDB from "./Config/DB.js";

dotenv.config();

const PORT = process.env.PORT || 6001;
let server;

// ================== ERROR HANDLERS ==================
process.on('uncaughtException', (err) => {
    LogError(err, "Uncaught Exception! Shutting Down... => server.js")
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    LogError(err, "UNHANDLED REJECTION! Shutting Down.... => server.js");
    if (server) server.close(() => process.exit(1));
});

// ================== MEMORY MONITORING ==================
let maxMemoryUsage = 0;
setInterval(() => {
    const mem = process.memoryUsage();
    const usedMB = Math.round(mem.heapUsed / 1024 / 1024);
    maxMemoryUsage = Math.max(maxMemoryUsage, usedMB);
    if (usedMB > process.env.MEMORY_WARNING_THRESHOLD || usedMB > 450) {
        LogData(`Memory : ${usedMB}MB`, `Max: ${maxMemoryUsage}MB`)
        if (global.gc) {
            global.gc();
            LogError("⚠️", "Forced garbage collection => Memory Management Funciton")
        }
    }
}, 30000);

// ================== SERVER STARTUP ==================
const startServer = async () => {
    try {
        const { isConnected, connection } = await connectDB();

        LogData("Starting Server....", "From server.js");
        const server = app.listen(PORT, () => {
            console.log(`
            🚀 Server ready at: http://localhost:${PORT}
            ⏱️  ${new Date().toLocaleString()}
            📊 Memory monitoring active
            🔒 Database connected: ${isConnected ? '✅' : '❌ (Databse Error)'}
            `);
        });

        // Error handling for server
        server.on('error',(err)=>{
            LogError(err,'Server Error => server.js');
            process.exit(1);
        });

                // 4. Graceful shutdown
        process.on('SIGTERM', () => {
            LogError('SIGTERM RECEIVED .' ,'Shutting down gracefully...');
            server.close(async () => {
                if (isConnected && connection) {
                    await mongoose.disconnect();
                    
                    LogData('💤 Database Disconnected!', 'From server.js');
                } else {
                    LogError('⚠️ No DB connection to close. Exiting.',"DB Error in server.js");
                }
                process.exit(0);
            });
        });
    } catch (error) {
        LogError(error,'💀 Failed to start server: server.js');
        process.exit(1);
    }
}

startServer();
