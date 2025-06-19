/** @format */

const controller = require("../DL/controllers/posts.controller");

const createNewPost = async (data = {}) => {
  if (!data.userId || !data.title || !data.body) {
    throw new Error("userId and title and body are required fields");
  }
  return await controller.create(data);
};
const getPosts = async (filter) => {
  if (!filter || !filter.userId) {
    throw new Error("userId is required to get todos");
  }
  return await controller.readMany(filter);
};
const getPostById = async (filter) => {
  if (!filter || !filter.postId || !filter.userId) {
    throw new Error(" postId , userId are required to get a post");
  }
  return await controller.readOne(filter);
};
const updatePost = async (data) => {
  if (!data.id || !data.userId || !data.title || !data.body) {
    throw new Error("id, userId, title and body are required fields");
  }
  return await controller.update(data);
};
const deletePost = async (data) => {
  const { id } = data;
  if (!id) {
    throw new Error("id is required to delete a post");
  }
  return await controller.deleteById(id);
};

module.exports = {
  createNewPost,
  getPosts,
  updatePost,
  deletePost,
  getPostById,
};
