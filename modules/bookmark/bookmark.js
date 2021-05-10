const mongoose = require('mongoose');

const BookmarkSchema = mongoose.Schema(
    {
        postID: {
            type: mongoose.Types.ObjectId,
            required : true
        },
        userID: {
            type: mongoose.Types.ObjectId,
            required : true
        },
        
    },
    {
        timestamps: true,
    }
);



module.exports = mongoose.model('bookmark', BookmarkSchema);

