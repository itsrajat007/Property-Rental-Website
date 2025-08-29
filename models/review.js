const { required } = require("joi");
const { default: mongoose } = require("mongoose");
const mangoose = require("mongoose");
let Schema = mongoose.Schema;

const reviewSchema =  new Schema({
    Comment:String,
    Rating:{
        type:Number,
        min:1,
        max:5,
    },
    CreatedAt:{
        type:Date,
        default:Date.now(),
    }
})

let Review = mangoose.model("Review",reviewSchema);

module.exports = Review;