const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";
main().then((res) => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "68b737c0d4153bcbb1ca36c7" }));
    await Listing.insertMany(initData.data);
    console.log("Sample data initailized");
};

initDB();