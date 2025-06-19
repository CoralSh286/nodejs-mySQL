

const pool = require("../db"); 
// CRUD
async function create({ postId, name, email, body }) {
  try {
    const query =
      "INSERT INTO comments ( post_id, name, email, body) VALUES (?, ?, ?, ?)";
    const [result] = await pool.execute(query, [postId, name, email, body]);

    return {
      success: true,
      id: result.insertId,
      message: "comment created successfully",
    };
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
}
async function readMany({ postId }) {
  try {
    let query = "SELECT * FROM comments WHERE post_id = ?";
    let params = [postId];
    const [result] = await pool.execute(query, params);

    return {
      success: true,
      data: result,
      message: "posts tasks loaded successfully",
    };
  } catch (error) {
    throw new Error("Failed to read comments: " + error.message);
  }
}

async function update(data) {
  const { id, name, email, body } = data;
   let checkQuery = "SELECT * FROM comments WHERE id = ?";
  let checkParams = [id];
  
  try {
    const existingComment = await pool.query(checkQuery, checkParams);
    if (!existingComment || existingComment.length === 0) {
      throw new Error("Comment not found or access denied");
    }

    let updateQuery = "UPDATE comments SET name = ?, email = ?, body = ? WHERE id = ?";
    let updateParams = [name, email, body, id];

    // Execute the update
    const result = await pool.query(updateQuery, updateParams);
    
    if (result.affectedRows === 0) {
      throw new Error("Comment not found or no changes made");
    }

    // Return the updated todo
    const updatedTodo = await pool.query("SELECT * FROM comments WHERE id = ?", [id]);
    return updatedTodo[0];
    
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}
async function deleteById(id) {
  try {
    const query = "DELETE FROM comments WHERE id = ?";
    const [result] = await pool.execute(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error("Comment not found or already deleted");
    }

    return {
      success: true,
      message: "comment deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }

}

module.exports = { create,  readMany, update, deleteById };
