import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;
let allPosts = [];
var count = 0;
let currentDate = new Date(); // Creates a new Date object representing the current date and time
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Add 1 because getMonth() is zero-based
    let year = ((currentDate.getFullYear()).toString()).slice(-2);
    let time = month + "-" + day + "-" + year;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    allPosts = [];
    res.render("index.ejs", {posts: allPosts});
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    count++;

    const newPost = {
        id: uuidv4(),
        firstName: req.body["fName"],
        lastName: req.body["lName"],
        blogTitle: req.body["title"],
        counter: count,
        blogContent: req.body["content"],
        blogTime: time
    };
    
    allPosts.unshift(newPost);
    res.render("index.ejs", {posts: allPosts});
    console.log(allPosts);
});

app.get("/edit", (req, res) => {
    const postID = req.query.id;
    const postEdit = allPosts.find(blogPost => postID === blogPost.id);
    res.render("partials/edit-post.ejs", {blogPost: postEdit});
});

app.post("/update", (req, res) => {
    const postID = req.body.id;
    const updatedPost = {
        id: postID,
        firstName: req.body["fName"],
        lastName: req.body["lName"],
        blogTitle: req.body["title"],
        counter: count,
        blogContent: req.body["content"],
        blogTime: time
    };
    allPosts = allPosts.map(blogPost => blogPost.id === postID ? updatedPost: blogPost);
    res.render("index.ejs", {posts: allPosts});
});

app.post("/delete", (req, res) => {
    const postID = req.body.id;

    allPosts = allPosts.filter(blogPost => blogPost.id !== postID);
    res.render("index.ejs", {posts: allPosts});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
