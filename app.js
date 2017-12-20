var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    scenicspot          = require("./models/scenicspot"),
    seedDB              = require("./seeds"),
    User                = require("./models/user"),
    comment             = require("./models/comment")
    
//requiring routes 
var commentRoutes       = require("./routes/comments"),
    scenicspotRoutes    = require("./routes/scenicspots"),
    indexRoutes         = require("./routes/index");
    
mongoose.Promise = global.Promise
var url = process.env.DATABASEURL || 'mongodb://localhost/yelp';
var promise = mongoose.connect(url, {
  useMongoClient: true,
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
// seedDB();


//passport configuration
app.use(require("express-session")({
    secret: "Yu is #1",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(methodOverride("_method="));
app.use("/scenicspots",scenicspotRoutes);
app.use("/scenicspots/:id/comments",commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started!");
})