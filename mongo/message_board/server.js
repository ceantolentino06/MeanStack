const express = require("express");
const app = express();
const mongoose = require('mongoose');
const body_parser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');

app.use(flash());
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

mongoose.connect('mongodb://localhost/messagesdb', { useNewUrlParser: true });

const CommentSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Your name is required"] },
    comment: { type: String, required: [true, "Comment cannot be empty"], minlength: [2, "Your comment must be 2 characters long"] }
})

const PostSchema = new mongoose.Schema({
    name_post: { type: String, required: [true, "Your name is required"] },
    message: { type: String, required: [true, "Message cannot be empty"], minlength: [2, "Your message must be 2 characters long"] },
    comments: [CommentSchema]
}, { timestamps: true })

const Comment = mongoose.model("Comment", CommentSchema)
const Post = mongoose.model("Post", PostSchema)

app.get('/', (request, response) => {
    Post.find()
        .then(data => {
            console.log(data);
            response.render("index", { posts: data })
        })
        .catch(err => res.json(err))
});

app.post('/postMsg', (req, res) => {
    const post = new Post(req.body)
    post.save()
        .then(() => res.redirect('/'))
        .catch(err => {
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/');
        });
})

app.post('/postCmnt/:post_id', (req, res) => {
    const comment = new Comment(req.body)
    comment.save()
        .then(newComment => {
            Post.findOneAndUpdate({ _id: req.params.post_id }, { $push: { comments: newComment } })
                .then(() => res.redirect('/'))
                .catch(err => res.json(err))
        })
        .catch(err => {
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/');
        });
})
app.listen(8000, () => console.log("listening on port 8000"));