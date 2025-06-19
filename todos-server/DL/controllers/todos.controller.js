/** @format */

const pool = require("../db"); // Adjust path to your db.js file
// CRUD
async function create({ userId, todoTask, isCompleted }) {
  try {
    const query =
      "INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)";
    const [result] = await pool.execute(query, [userId, todoTask, isCompleted]);

    return {
      success: true,
      id: result.insertId,
      message: "Todo task created successfully",
    };
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo task");
  }
}
async function readMany({ userId, isCompleted, taskName , id}) {
  try {
    let query = "SELECT * FROM todos WHERE user_id = ?";
    let params = [userId];

    const conditions = [];

    if (isCompleted !== undefined && isCompleted !== null) {
      conditions.push("completed = ?");
      if( isCompleted === "true") {
        params.push(1);
      } else if (isCompleted === "false") {
        params.push(0); 
      }
    }

    if (taskName && taskName.trim() !== "") {
      conditions.push("title LIKE ?");
      params.push(`%${taskName}%`);
    }
    if (id) {
      conditions.push("id = ?");
      params.push(id);
    }

    if (conditions.length > 0) {
      query += " AND " + conditions.join(" AND ");
    }

    const [result] = await pool.execute(query, params);

    return {
      success: true,
      data: result,
      message: "Todo tasks loaded successfully",
    };
  } catch (error) {
    throw new Error("Failed to read todos");
  }
}

async function update(data) {
  const { id, userId, todoTask, isCompleted } = data;
  
  // First, check if the todo exists and belongs to the user
  let checkQuery = "SELECT * FROM todos WHERE id = ? AND user_id = ?";
  let checkParams = [id, userId];
  
  try {
    const existingTodo = await pool.query(checkQuery, checkParams);
    if (!existingTodo || existingTodo.length === 0) {
      throw new Error("Todo not found or access denied");
    }

    let updateQuery = "UPDATE todos SET title = ?, completed = ? WHERE id = ? AND user_id = ?";
    let updateParams = [todoTask, isCompleted, id, userId];

    // Execute the update
    const result = await pool.query(updateQuery, updateParams);
    
    if (result.affectedRows === 0) {
      throw new Error("Todo not found or no changes made");
    }

    // Return the updated todo
    const updatedTodo = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);
    return updatedTodo[0];
    
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}
async function deleteById(id) {
  // delete todo
  try {
    const query = "DELETE FROM todos WHERE id = ?";
    const [result] = await pool.execute(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error("Todo not found");
    }

    return {
      success: true,
      message: "Todo task deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("Failed to delete todo task");
  }
}

module.exports = { create, readMany, update, deleteById };
