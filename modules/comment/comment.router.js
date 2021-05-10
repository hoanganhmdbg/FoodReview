const commentController = require('./comment.controller');
const express = require('express');
const Router = express.Router();
const { isAuth } = require('../../middlewares/isAuth');

Router.post('/', isAuth, async (req, res) => {
    try {
        const { content, postId } = req.body;
        const userId = req.user._id;
        const name  = req.user.name;

        const comment = await commentController.postComment({ content, postId, createdBy: userId,name });
        
        res.send({
            success: 1,
            data: comment
        })
    } catch (err) {
        res.send({
            success: 0,
            message: err.message
        })
    }
});

module.exports = Router;