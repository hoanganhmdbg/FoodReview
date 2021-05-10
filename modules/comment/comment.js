const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // userId
      ref: 'user' //userId
    },
    post: {
      type: mongoose.Types.ObjectId, // postId
      ref: 'post'
    }
  },
  { timestamps: true } // createdAt, updatedAt
);


module.exports = mongoose.model('comment', CommentSchema);