const PostModel = require('../post/post');


const createPost = async ({ imageUrl, title, content, createdBy, like, type }) => {
    const newPost = await PostModel.create({
        imageUrl, title, content, createdBy, like, type
    });
    return newPost;
}

const getPosts = async ({ offset, limit }) => {

    const [posts, total] = await Promise.all([
        PostModel
            .find()
            .skip(offset)
            .limit(limit)
            .select('-__v')
            .populate({
                path: 'createdBy',
                select: 'email'
            }).lean(),
        PostModel.countDocuments()
    ])

    return [posts, total];
}

const getDetailPost = async (postId) => {
    const foundPost = await PostModel.findById(postId)
        .populate('createdBy', 'email')
        .populate({
            path: 'comments',
            populate: {
                path: 'createdBy',select : 'name'
            },
            select : 'content'
        })

    if (!foundPost) throw new Error("Not found post");

    return foundPost;
}



module.exports = {
    createPost,
    getPosts,
    getDetailPost
}