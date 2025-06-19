/** @format */

const commentsService = require("../BL/comments.service.js");
const express = require("express"),
  router = express.Router();

router.get("/", async (req, res) => {
  try {
    const postId = req.query.postId;
    res.send(await commentsService.getComments({ postId }));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/add-comment", async (req, res) => {
  try {
    const { postId, name, email, body } = req.body;
    const newComment = await commentsService.createNewComment({
      postId,
      name,
      email,
      body,
    });
    if (!newComment) {
      return res.status(400).send({
        success: false,
        message: "Failed to create comment",
      });
    }
    res.status(201).send({
      success: true,
      data: {
        id: newComment.id,
        post_id: postId,
        name: name,
        email: email,
        body: body,
      },
      message: "Comment created successfully",
    });
  } catch (error) {
    res.status(400).send(error.message || "Error creating comment");
  }
});
router.put("/update-comment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { body, email, name } = req.body;
    const updatedComment = await commentsService.updateComment({
      id,
      email,
      name,
      body,
    });
    if (!updatedComment || updatedComment.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Comment not found",
      });
    }
    return res.send({
      success: true,
      data: updatedComment[0],
      message: "Comment updated successfully",
    });
  } catch (error) {
    res.status(400).send(error.message || "Error updating post");
  }
});

router.delete("/delete-comment/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    res.send(await commentsService.deleteComment({ id: commentId }));
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
