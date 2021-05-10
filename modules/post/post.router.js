const express = require('express');
const Router = express.Router();
const { isAuth, enhanceAuth } = require('../../middlewares/isAuth');
const { getBookmarks } = require('../bookmark/bookmark.controller');
const postController = require('./post.controller');

// api/posts/
// get phân trang bài viết
Router.get('/',
    enhanceAuth, 
    async (req, res) => {
        try {
            const { page, pageSize } = req.query;

            const numberPage = Number(page) || 1;
            const numberPageSize = Number(pageSize) || 12;

            const offset = (numberPage - 1) * numberPageSize;
            const limit = numberPageSize;

            let [data, total] = await postController.getPosts({ offset, limit });

            const existedUser = req.user;
            if (!existedUser) {
                return res.send({ success: 1, data: { data, total } });
            }
            const posts = data.map(post => post._id);
            //console.log(posts);

            const bookmark = await getBookmarks(posts, existedUser._id);
            //console.log(bookmark);
            let bookmarkObject = {};
            for(let item of bookmark){
                bookmarkObject[item.postID] = true;
            }
            data = data.map(item => ({...item,isBookmark : bookmarkObject[item._id]}));
            res.send({
                success: 1,
                data: {data, total}
            })
        } catch (err) {
            console.log('vao day', err);
            res.status(500).send({ success: 0, message: err.message })
        }
    });

// api/posts
// tạo bài viết
// check token ở trong header có hợp lệ hay ko ?
Router.post('/',
    isAuth,
    async (req, res) => {
        try {
            const { title, content, imageUrl } = req.body;

            //req.user có được chạy thông qua thằng middleware
            const createdBy = req.user._id;
            //check dữ liệu client gửi lên
            const newPost = await postController.createPost({
                title, content, imageUrl, createdBy
            });

            res.send({ success: 1, data: newPost });

        } catch (err) {
            res.status(500).send({ success: 0, message: err.message })
        }
    });


Router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postController.getDetailPost(id);
        res.send({ success: 1, data: post });
    } catch (err) {
        res.status(500).send({ success: 0, message: err.message });
    }
})

module.exports = Router;