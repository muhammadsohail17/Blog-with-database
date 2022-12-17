//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");


const home = require('./constants/home');
const about = require('./constants/about');
const contact = require('./constants/contact');
const careers = require('./constants/careers');

const Post = require('./models/post');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://Admin-sohail:test123@cluster0.lnzzz7i.mongodb.net/test", {useNewUrlParser: true});



app.get("/", (req, res) => {

  Post.find({},(err, posts) => {
    res.render("home", {
      startingContent: home,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: about});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contact});
});

app.get("/careers", function(req, res){
  res.render("careers", {careers: careers});
});


module.exports = app;
