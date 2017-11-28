var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/scenicspots", function(req, res) {
    var scenicspots = [
        {name: "1", image: "https://farm6.staticflickr.com/5604/15541744427_3d92a480a4.jpg"},
        {name: "2", image: "https://farm6.staticflickr.com/5641/22403300756_a413f3fd59.jpg"},
        {name: "3", image: "https://farm5.staticflickr.com/4308/36053252101_dde14a28a9.jpg"}
    ]
    res.render("scenicspots", {scenicspots:scenicspots});
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started!");
})