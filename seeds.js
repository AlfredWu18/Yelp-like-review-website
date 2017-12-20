var mongoose        = require("mongoose"),
    scenicspot      = require("./models/scenicspot"),
    Comment         = require("./models/comment");

var data = [
    {
        name: "Fanta Island", 
        image: "https://farm6.staticflickr.com/5641/22403300756_a413f3fd59.jpg",
        description: "Not just a great valley, but a shrine to human foresight, the strength of granite, the power of glaciers, the persistence of life, and the tranquility of the High Sierra. First protected in 1864, Yosemite National Park is best known for its waterfalls, but within its nearly 1,200 square miles, you can find deep valleys, grand meadows, ancient giant sequoias, a vast wilderness area, and much more."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5604/15541744427_3d92a480a4.jpg",
        description: "Not just a great valley, but a shrine to human foresight, the strength of granite, the power of glaciers, the persistence of life, and the tranquility of the High Sierra. First protected in 1864, Yosemite National Park is best known for its waterfalls, but within its nearly 1,200 square miles, you can find deep valleys, grand meadows, ancient giant sequoias, a vast wilderness area, and much more."
    },
    {
        name: "Cloud's Rest", 
        image: "https://farm5.staticflickr.com/4308/36053252101_dde14a28a9.jpg",
        description: "Not just a great valley, but a shrine to human foresight, the strength of granite, the power of glaciers, the persistence of life, and the tranquility of the High Sierra. First protected in 1864, Yosemite National Park is best known for its waterfalls, but within its nearly 1,200 square miles, you can find deep valleys, grand meadows, ancient giant sequoias, a vast wilderness area, and much more."
    },
]

function seedDB() {
    //remove all scenicspots
    scenicspot.remove({}, function(err) {
        // if (err) {
        //     console.log(err);
        // }
        // console.log("removed scenicspot");
        //     //add a few new scenicspots
        // data.forEach(function(seed){
        //     scenicspot.create(seed, function(err, scenicspot){
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("added a new scenicspot");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is great, but I wish there is Internet.",
        //                     author: "Homer"
        //                 }, function(err, comment) {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         scenicspot.comments.push(comment);
        //                         scenicspot.save();
        //                         console.log("create a new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;


