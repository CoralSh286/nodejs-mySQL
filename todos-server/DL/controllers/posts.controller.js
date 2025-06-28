

const pool = require("../db");
// CRUD
async function create({ userId, title, body }) {
  try {
    const query = "INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)";
    const [result] = await pool.execute(query, [userId, title, body]);

    return {
      success: true,
      id: result.insertId,
      message: "post created successfully",
    };
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
}
async function readMany({ userId, title }) {
  try {
    let query = "SELECT * FROM posts WHERE user_id = ?";
    let params = [userId];


    const conditions = [];

    if (title && title.trim() !== "") {
      conditions.push("title LIKE ?");
      params.push(`%${title}%`);
    }

    if (conditions.length > 0) {
      query += " AND " + conditions.join(" AND ");
    }

    const [result] = await pool.execute(query, params);

    return {
      success: true,
      data: result,
      message: "posts tasks loaded successfully",
    };
  } catch (error) {
    throw new Error("Failed to read todos");
  }
}
async function readOne({ userId, postId }) {
  try {
    let query = "SELECT * FROM posts WHERE user_id = ? AND id = ?";
    let params = [userId, postId];
    const [result] = await pool.execute(query, params);

    if (result.length === 0) {
      return {
        success: false,
        data: [],
        message: "Post not found",
      };
    }

    return {
      success: true,
      data: result,
      message: "Post loaded successfully",
    };
  } catch (error) {
    throw new Error("Failed to read post");
  }
}
async function update(data) {
  const { id, userId, title, body } = data;

  // First, check if the todo exists and belongs to the user
  let checkQuery = "SELECT * FROM posts WHERE id = ? AND user_id = ?";
  let checkParams = [id, userId];

  try {
    const existingTodo = await pool.query(checkQuery, checkParams);
    if (!existingTodo || existingTodo.length === 0) {
      throw new Error("Todo not found or access denied");
    }

    let updateQuery = "UPDATE posts SET title = ?, body = ? WHERE id = ? AND user_id = ?";
    let updateParams = [title, body, id, userId];

    // Execute the update
    const result = await pool.query(updateQuery, updateParams);

    if (result.affectedRows === 0) {
      throw new Error("Post not found or no changes made");
    }
    // Return the updated todo
    const updatedTodo = await pool.query("SELECT * FROM posts WHERE id = ?", [
      id,
    ]);
    return updatedTodo[0];
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
async function deleteById(id) {
  try {
    const prevQuery = "DELETE FROM comments WHERE post_id = ?";
    await pool.execute(prevQuery, [id]);

    const query = "DELETE FROM posts WHERE id = ?";
    const [result] = await pool.execute(query, [id]);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Post not found or already deleted",
      };
    }

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
}

module.exports = { create, readOne, readMany, update, deleteById };
