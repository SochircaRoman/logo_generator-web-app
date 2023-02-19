const config = require("./config/config.js");
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const db = {
    init: async () => {
        try {
            await mongoose.connect(config.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.error('\x1b[32m', 'Connection to database: OK');

        } catch (error) {
            console.error('\x1b[31m', 'Unable to connect to the database:', error);
        }
    }
};
module.exports = db