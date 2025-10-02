/**
 * @fileoverview Comment routes for handling comment-related API endpoints
 * @requires express
 * @requires mongoose
 * @requires Comment
 */

/**
 * GET /api/comments/post/:postId
 * Retrieves all comments for a specific post
 * @route GET /post/:postId
 * @param {string} req.params.postId - The ID of the post to get comments for
 * @returns {Object[]} 200 - Array of comment objects
 * @returns {Object} 500 - Internal server error
 * @example
 * // GET /api/comments/post/507f1f77bcf86cd799439011
 * // Returns: [{ _id, postId, content, author, createdAt, ... }]
 */

/**
 * DELETE /api/comments/:commentId
 * Deletes a specific comment by its ID
 * @route DELETE /:commentId
 * @param {string} req.params.commentId - The ID of the comment to delete
 * @returns {Object} 200 - Success message confirming deletion
 * @returns {Object} 404 - Comment not found error
 * @returns {Object} 500 - Internal server error
 * @example
 * // DELETE /api/comments/507f1f77bcf86cd799439011
 * // Returns: { message: "Comment deleted successfully" }
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Hey GitHub Copilot, please help me write a route to get all comments for a specific post
router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// add another endopoint for deleting a comment
router.delete("/:commentId", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});