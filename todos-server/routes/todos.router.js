/** @format */

const express = require("express"),
  router = express.Router();
const todosService = require("../BL/todos.service");

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const isCompleted = req.query.isCompleted;
    const taskName = req.query.title;
    const id = req.query.id;
    const todos = await todosService.getTodos({
      userId,
      isCompleted,
      taskName,
      id,
    });
    res.send(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message, "Error fetching todos");
  }
});
router.post("/add-task", async (req, res) => {
  try {
    const { userId, title, completed } = req.body;
    const newTodo = await todosService.createNewTodo({
      userId: userId,
      isCompleted: completed,
      todoTask: title,
    });
    if (!newTodo) {
      return res.status(400).send({
        success: false,
        message: "Failed to create todo",
      });
    }
    res.send({
      success: true,
      data: {
        id: newTodo.id,
        userId: userId,
        title: title,
        completed: completed,
      },
      message: "Todo task created successfully",
    });
  } catch (error) {
    res.status(400).send(error.message || "Error creating todo");
  }
});

router.put("/update-task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { userId, title, completed } = req.body;
    const updatedTodo = await todosService.updateTodo({
      userId,
      todoTask: title,
      isCompleted: completed,
      id: taskId,
    });
    if (!updatedTodo || updatedTodo.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Todo not found or update failed",
      });
    }
    res.send({
      success: true,
      data: updatedTodo[0],
      message: "Todo task updated successfully",
    });
  } catch (error) {
    res.status(400).send(error.message || "Error updating todo");
  }
});
router.delete("/delete-task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    res.send(await todosService.deleteTodo({ id: taskId }));
  } catch (error) {
    res.status(400).send(error.message || "Error deleting todo");
  }
});

module.exports = router;
