const express = require('express');
const Router = express.Router();
const bookmarkController = require('./bookmark.controller')
const { isAuth } = require('../../middlewares/isAuth');
Router.post('/',
    isAuth,
    async (req, res) => {
        try {
            const { postID } = req.body;
            const userID = req.user._id;
            //req.user có được chạy thông qua thằng middleware
            //const createdBy = req.user._id;
            //check dữ liệu client gửi lên
            const newPost = await bookmarkController.addBookMark({
                postID, userID
            });

            res.send({ success: 1, data: newPost });

        } catch (err) {
            res.status(500).send({ success: 0, message: err.message })
        }
    });
    Router.delete('/',
    isAuth,
    async (req, res) => {
        try {
            const { postID } = req.body;
            const userID = req.user._id;
            //req.user có được chạy thông qua thằng middleware
            //const createdBy = req.user._id;
            //check dữ liệu client gửi lên
            const newPost = await bookmarkController.deleteBookMark({
                postID, userID
            });

            res.send({ success: 1, data: newPost });

        } catch (err) {
            res.status(500).send({ success: 0, message: err.message })
        }
    });


module.exports = Router;