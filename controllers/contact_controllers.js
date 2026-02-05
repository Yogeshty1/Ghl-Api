const express = require("express");
const router = express.Router();
const ghlAuthMiddleware = require("../middleware/ghlAuthMiddleware"); // check path

router.post("/create", ghlAuthMiddleware, async (req, res) => {
  res.json({ message: "Create contact endpoint" });
});

module.exports = router;






//ghlAuthMiddleware

// router.post("/" , isLoggedIn,validateReview, wrapAsync(async(req,res,next) => {
//   let listing = await Listing.findById(req.params.id);
//   let newReview = new Review(req.body.review);
//   newReview.owner = req.user._id;

//   listing.reviews.push(newReview);

//   await newReview.save();
//   await listing.save();
  
//   req.flash("success", "Review added successfully!");
//   res.redirect(`/listings/${listing._id}`);
// }));