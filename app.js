const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main().then((res) => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));


app.get("/", (req,res) => {
    res.send("Root is working");
})

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all("*",(req,res,next) =>{
    next(new ExpressError(404,"Page not found!"));
})

app.use((err,req,res,next) =>{
    let {statusCode = 505, message = "Something went wrong!"} = err;
    res.status(statusCode).render("Error.ejs",{message});
    //res.status(statusCode).send(message);
})

app.listen(3000,(req,res) => {
    console.log("Server is listening to port:3000");
})