const commentModel = require('./comment');
const postModel = require('../post/post');
const postComment = async ({ postId, createdBy, content, name }) => {
    const existPost = await postModel.findById(postId);
    if (!existPost) throw new Error('post not exist');

    const newComment = await commentModel.create({
        content, createdBy, post: postId
    });
    console.log(newComment);
    const enhanceComment = {
        ...newComment._doc,
        createdBy: {
            _id: createdBy,
            name
        }
    }
    return enhanceComment;
}

module.exports = {
    postComment
}