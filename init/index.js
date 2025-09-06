const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });



// MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";
const dbUrl = process.env.ATLASDB_URL;

main().then((res) => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
};

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "68b737c0d4153bcbb1ca36c7" }));
    await Listing.insertMany(initData.data);
    console.log("Sample data initailized");
};

initDB();