const BookMarkModel = require('./bookmark');

const addBookMark = async ({ postID, userID }) => {
    const newBookMark = await BookMarkModel.create({ postID, userID });
    return newBookMark;
}

const deleteBookMark = async ({ postID, userID }) => {
    const bookmarkRemove = await BookMarkModel.findOneAndDelete({ postID, userID });
    return bookmarkRemove;
}

const getBookmarks = async (posts, userID) => {
    const bookmarks = await BookMarkModel.find({
        userID,
        postID: { $in: posts }
    });
    return bookmarks;
}
module.exports = {
    addBookMark,
    deleteBookMark,
    getBookmarks
}
