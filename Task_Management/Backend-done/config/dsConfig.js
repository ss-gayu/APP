const mongoose = require("mongoose");

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_DATABASE_NAME = process.env.MONGO_DB_DATABASE_NAME;

const MONGO_DB_CONNECT_URL = MONGO_DB_URL.replace("<db_password>", MONGO_DB_PASSWORD);
const MONGO_DB_CONNECT_URL_WITH_DB_NAME = MONGO_DB_CONNECT_URL.replace("/?", `/${MONGO_DB_DATABASE_NAME}?`);

const connectToDb = async () => {
    try {
        await mongoose.connect(MONGO_DB_CONNECT_URL_WITH_DB_NAME);
        console.log("---------- ✅ Database Connected ---------");
        console.log("------------------------------------------");
    } catch (err) {
        console.log("-------- ❌ Database NOT Connected -------");
        console.log("------------------------------------------");
    }
};

connectToDb();