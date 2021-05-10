const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const AuthRouter = require('./modules/auth/auth.router');
const PostRouter = require('./modules/post/post.router');
const bookmarkRouter = require('./modules/bookmark/bookmark.router');
const commentRouter = require('./modules/comment/comment.router');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.log('Mongo err', err);
    console.log("MongoDB connected");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', AuthRouter);
app.use('/api/posts', PostRouter);
app.use('/api/comment', commentRouter);
app.use('/api/bookmark', bookmarkRouter);
// app.use('/api/comments', CommentRouter);

app.listen(process.env.PORT, (err) => {
    if (err) return console.log('Start err', err);
    console.log('Server started');
});

