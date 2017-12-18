var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    scenicspot          = require("./models/scenicspot"),
    seedDB              = require("./seeds"),
    comment             = require("./models/comment")
    
mongoose.connect("mongodb://localhost/yelp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", function(req, res) {
    res.render("landing");
})


// scenicspot.create({
//     name: "2", image: "https://farm6.staticflickr.com/5641/22403300756_a413f3fd59.jpg",
//     description: "beautiful maintain view"
// }, function(err, scenicspot) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEWLY ");
//         console.log(scenicspot);
//     }
// } );

// var scenicspots = [
//     {name: "1", image: "https://farm6.staticflickr.com/5604/15541744427_3d92a480a4.jpg"},
//     {name: "2", image: "https://farm6.staticflickr.com/5641/22403300756_a413f3fd59.jpg"},
//     {name: "3", image: "https://farm5.staticflickr.com/4308/36053252101_dde14a28a9.jpg"}
// ];

app.get("/scenicspots", function(req, res) {
    scenicspot.find({}, function(err, allScenicspot) {
        if (err) {
            console.log();
        } else {
            res.render("scenicspots/index", {scenicspots:allScenicspot});
        }
    });
});

app.get("/scenicspots/new", function(req, res){
    res.render("scenicspots/new");
})

app.post("/scenicspots", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newScenicSpot = {name: name, image:image, description: desc};
    scenicspot.create(newScenicSpot, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/scenicspots");
        }
    })
})


app.get("/scenicspots/:id", function(req, res) {
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

app.get("/scenicspots/:id/comments/new", function(req, res) {
    scenicspot.findById(req.params.id, function(err, scenicspot) {
        // alert("alfred");
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {scenicspot: scenicspot});
        }
    })
});


app.post("/scenicspots/:id/comments", function(req, res) {
    scenicspot.findById(req.params.id, function(err, scenicspot) {
        if (err) {
            console.log(err);
            res.redirect("/scenicspots");
        } else {
            comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    scenicspot.comments.push(comment);
                    scenicspot.save();
                    res.redirect("/scenicspots/" + scenicspot._id);
                }
            })
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started!");
})