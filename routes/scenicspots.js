var express = require("express");
var router  = express.Router();
var scenicspot = require("../models/scenicspot");
var middleware = require("../middleware");

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

router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newScenicSpot = {name: name, price: price, image:image, description: desc, author: author};
    scenicspot.create(newScenicSpot, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/scenicspots");
        }
    })
})


router.get("/:id", function(req, res) {
    // res.send("this will be");
    scenicspot.findById(req.params.id).populate("comments").exec(function(err, foundScenicspot) {
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



//udpate
router.post("/:id", middleware.checkScenicspotOwnership, function(req, res) {    //unlike in the video, shouldn't be put here 
    //                          notice it should be body here
    scenicspot.findByIdAndUpdate(req.params.id, req.body.scenicspot, function(err, updatedScenicspot){
        if (err) {
            res.redirect("/scenicspots");
        } else {
            res.redirect("/scenicspots/" + req.params.id);
        }
    });   
});



module.exports = router;