/** @format */

const controller = require("../DL/controllers/comments.controller");

const createNewComment = async (data = {}) => {
  if (!data.postId || !data.name || !data.email || !data.body) {
    throw new Error("userId and title and body are required fields");
  }
  return await controller.create(data);
};
const getComments = async (data) => {
  if (!data || !data.postId) {
    throw new Error("postId is required to get posts");
  }
  return await controller.readMany(data);
};
const updateComment = async (data) => {
  const { id, name, email, body } = data;
  
  if (!id || !name || !email || !body) {
    throw new Error("id, postId, name, email and body are required fields");
  }
  return await controller.update(data);
};
const deleteComment = async (data) => {
  if (!data.id) {
    throw new Error("id is required to delete a comment");
  }
  const res = await controller.deleteById(data.id);
  if(res.success){
    return true;
  }
};

module.exports = { createNewComment, getComments, updateComment, deleteComment };
