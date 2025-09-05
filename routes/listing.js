const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const listingsController = require("../controllers/listings.js");

// Index Route
// Create Route
router
    .route("/")
    .get( wrapAsync(listingsController.index))
    .post( isLoggedIn, validateListing, wrapAsync(listingsController.createListing));

//New Route
router.get("/new",isLoggedIn, listingsController.renderNewForm);

//Show Route
//Update Route
//Delete Route
router
    .route("/:id")
    .get( wrapAsync( listingsController.showListings ))
    .put( isLoggedIn,isOwner, validateListing, wrapAsync(listingsController.updateListing))
    .delete( isLoggedIn,isOwner, wrapAsync( listingsController.destroyListing));


//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingsController.renderEditForm));

module.exports = router;