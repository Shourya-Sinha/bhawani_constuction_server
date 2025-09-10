import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { LogData, LogError } from '../Global_Helper/Global.js';
import ChangeDataModel from '../Model/AllTypeModel.js';

dotenv.config();

const DB = process.env.MONGO_URI;

const connectDB = async () => {
    if (!DB) {
        LogError('❌ MongoDB URI not found', 'ConnectDB()=>');
        return { isConnected: false, connection: null };
    }
    try {
        const connection = await mongoose.connect(DB);
        LogData('✅ MongoDB Connected', 'ConnectDB()=>');
        try {
            const count = await ChangeDataModel.countDocuments();
            if (count === 0) {
                // create with no data — Mongoose will use schema defaults
                await ChangeDataModel.create({});
                LogData('🌱 Default ChangeDataModel document seeded.', 'ConnectDB()=>');
            } else {
                LogData(`ℹ️ ChangeDataModel already has ${count} document(s), checking for schema updates.`, 'ConnectDB()=>');

                // 🛠️ Migration logic: merge new defaults into first document
                const doc = await ChangeDataModel.findOne();
                if (doc) {
                    // create a temp document in memory (not saved)
                    const defaults = (await ChangeDataModel.create({})).toObject();
                    await ChangeDataModel.deleteOne({ _id: defaults._id }); // remove the temp doc

                    // Merge whatever you need (example: full serviceSection replaced with new defaults)
                    doc.serviceSection = defaults.serviceSection;

                    // You can repeat for other sections, e.g. projectSection, clientSection, etc.

                    await doc.save();
                    LogData('♻️ Existing ChangeDataModel document updated with new defaults.', 'ConnectDB()=>');
                }
            }
        } catch (seedError) {
            LogError(`❌ ${seedError.message}`, 'ConnectDB()=> seeding failed');
        }
        return { isConnected: true, connection };
    } catch (error) {
        LogError(`❌ ${error.message}`, 'ConnectDB()=> MongoDB connection failed');
        return { isConnected: false, connection: null };
    }
}

export default connectDB;