const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        like:{
            type: Number,
            default: 0
        },
        type: {
            type: String,
            enum: ['hot', 'cold'],
            default: 'cold'
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }, // option nayf chir neen define khi ma co dung co che virtual field
        toObject: { virtuals: true }
    }
);

PostSchema.virtual('comments', {
    ref: 'comment', // the model to use
    localField: '_id', // find people where 'localField
    foreignField: 'post'
});

module.exports = mongoose.model('post', PostSchema);

