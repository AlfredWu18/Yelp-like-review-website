var express = require("express");
var router  = express.Router();
var scenicspot = require("../models/scenicspot");
var middleware = require("../middleware");

var NodeGeocoder = require('node-geocoder');
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
var geocoder = NodeGeocoder(options);

router.get("/", function(req, res) {
    scenicspot.find({}, function(err, allScenicspot) {
        if (err) {
            console.log();
        } else {
            res.render("scenicspots/index", {scenicspots:allScenicspot});
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("scenicspots/new");
})

// router.post("/", middleware.isLoggedIn, function(req, res){
//     var name = req.body.name;
//     var price = req.body.price;
//     var image = req.body.image;
//     var desc = req.body.description;
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     };
//     var newScenicSpot = {name: name, price: price, image:image, description: desc, author: author};
//     scenicspot.create(newScenicSpot, function(err, newlyCreated) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(newlyCreated);
//             res.redirect("/scenicspots");
//         }
//     })
// })

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newScenicSpot = {name: name, image: image, description: desc, price: price, author:author, location: location, lat: lat, lng: lng};
    scenicspot.create(newScenicSpot, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/scenicspots");
        }
    });
  });
});


router.get("/:id", function(req, res) {
    // res.send("this will be");
    scenicspot.findById(req.params.id).populate("comments").exec(function(err, foundScenicspot) {   //
        if(err) {
            console.log(err);
        } else {
            // console.log(foundScenicspot);
            res.render("scenicspots/show", {scenicspot: foundScenicspot});
        }
    });
});


//edit
router.get("/:id/edit", middleware.checkScenicspotOwnership, function(req, res) {
    scenicspot.findById(req.params.id, function(err, foundScenicspot) {
        res.render("scenicspots/edit", {scenicspot: foundScenicspot});
    });
});


//destroy
// router.delete("/:id", function(req, res) {
//     scenicspot.findByIdAndRemove(req.params.id, function(err) {
//         if (err) {
//             console.log(err);
//             res.redirect("/scenicspots");
//         } else {
//             res.redirect("/scenicspots");
//         }
//     });
//     // res.send("you are");
// });



// //udpate
// router.post("/:id", middleware.checkScenicspotOwnership, function(req, res) {    //unlike in the video, shouldn't be put here 
    
//     //                          notice it should be body here
//     scenicspot.findByIdAndUpdate(req.params.id, req.body.scenicspot, function(err, updatedScenicspot){
//         if (err) {
//             res.redirect("/scenicspots");
//         } else {
//             res.redirect("/scenicspots/" + req.params.id);
//         }
//     });   
// });


// UPDATE CAMPGROUND ROUTE
router.post("/:id", middleware.checkScenicspotOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
    scenicspot.findByIdAndUpdate(req.params.id, newData, function(err, updatedScenicspot){
        if(err){
            req.flash("error", err.message);
            res.redirect("/scenicspots");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/scenicspots/" + updatedScenicspot._id);
        }
    });
  });
});


module.exports = router;