export const LogError = (errorName, errorPlace) => {
    console.error(`❌ Error Occurred:
    Name       : ${errorName}
    Location   : ${errorPlace}
    Time       : ${new Date().toISOString()}
    `);
};

export const LogData = (dataName, dataPlace) => {
    console.error(`✅ Data Logged:
    Name       : ${dataName}
    Location   : ${dataPlace}
    Time       : ${new Date().toISOString()}
    `);
};


