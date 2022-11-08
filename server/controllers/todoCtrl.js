const Todo = require("../models/todoModel");

const todoCtrl = {
  getTodo: async (req, res) => {
    try {
      const todo = await Todo.find({
        user_id: req.user.id,
      });
      res.json(todo);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createTodo: async (req, res) => {
    const { title, description } = req.body;
    const date = new Date();
    try {
      const todo = new Todo({
        title,
        description,
        status: "active",
        user_id: req.user.id,
        date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
      });
      await todo.save();
      res.json({ todo });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteTodo: async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a note!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateTodo: async (req, res) => {
    try {
      const { title, description, status } = req.body;
      await Todo.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title,
          description,
          status,
        }
      );
      res.json({ msg: "Updated a note!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = todoCtrl;
