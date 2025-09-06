const { default: mongoose } = require("mongoose");
const mangoose = require("mongoose");
const Review = require("./review.js");
let Schema = mongoose.Schema;


let listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String, 
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id: {  $in: listing.reviews}});
    }
})

let Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;