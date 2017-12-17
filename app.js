var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose");

mongoose.connect("mongodb://localhost/yelp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
})

var spotSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var scenicspot = mongoose.model("scenicspot", spotSchema);

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
            res.render("index", {scenicspots:allScenicspot});
        }
    });
});

app.get("/scenicspots/new", function(req, res){
    res.render("new");
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
    scenicspot.findById(req.params.id, function(err, foundScenicspot) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {scenicspot: foundScenicspot});
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started!");
})