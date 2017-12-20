var scenicspot = require("../models/scenicspot");
var comment = require("../models/comment");

var middlewareObj = {
checkCommentOwnership: function(req, res, next) {
    if (req.isAuthenticated()){
         comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
},

checkScenicspotOwnership: function(req, res, next) {
    if (req.isAuthenticated()){
        scenicspot.findById(req.params.id, function(err, foundScenicspot) {
            if (err) {
                req.flash("error", "Scenicspot not found");
                res.redirect("back");
            } else {
                if (foundScenicspot.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
},

isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

};
module.exports = middlewareObj;