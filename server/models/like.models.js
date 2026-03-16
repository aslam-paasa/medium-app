const mongoose = require("mongoose");

/**
 * Kisko like kr rhe hai? BlogId
 * Kon like kr rha hai?   UserId
*/
const likeSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;