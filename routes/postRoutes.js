const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
// routes/postRoutes.js
router.get('/', async (req, res) => {
    try {
    const posts = await Post.find();
    res.render('index', { posts });
     } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching posts');
    }
});

router.get('/posts/new', (req, res) => {
    res.render('newPost'); // Renders the new post form
});

router.post('/posts/', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });
    await newPost.save();
    res.redirect('/');
});

// view post
router.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('viewPost', { post });
});
// Edit post form
router.get('/posts/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('editPost', { post });
});

// Handle post update
router.post('/posts/edit/:id', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content
    });
    res.redirect(`/posts/${req.params.id}`);
});

// Delete post
router.post('/posts/delete/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;


module.exports = router;
