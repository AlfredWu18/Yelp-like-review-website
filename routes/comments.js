var express = require("express");
var router  = express.Router({mergeParams: true});
var scenicspot = require("../models/scenicspot");
var comment = require("../models/comment");
var middleware = require("../middleware");  // don't need /index.js

// Comments new 
router.get("/new", middleware.isLoggedIn, function(req, res) {
    scenicspot.findById(req.params.id, function(err, scenicspot) {
        // alert("alfred");
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {scenicspot: scenicspot});
        }
    })
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
    scenicspot.findById(req.params.id, function(err, scenicspot) {
        if (err) {
            console.log(err);
            res.redirect("/scenicspots");
        } else {
            comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add username and id to comments
                    // console.log(req.user.username);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    scenicspot.comments.push(comment);
                    scenicspot.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/scenicspots/" + scenicspot._id);
                }
            })
        }
    })
});

//comments edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {scenicspot_id: req.params.id, comment: foundComment});
        }
    })
});


//comments update
router.post("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/scenicspots/" + req.params.id);
        }
    })
});



module.exports = router;
