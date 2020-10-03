const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Todo = require("../../models/Todo");
const User = require("../../models/User");

// @route POST api/todo
// @desc Create todo
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("text", "Text is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newTodo = new Todo({
        title: req.body.title,
        text: req.body.text,
        user: req.user.id,
      });

      const todo = await newTodo.save();
      res.json(todo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

// @route GET api/todo
// @desc Get all todos
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user);
    const todos = await Todo.find({user:req.user.id}).sort({ date: -1 });
    res.json(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});


// @route DELETE api/todo/:id
// @desc Delete a todo
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    //check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }
    await todo.remove();
    res.json({ msg: "Todo deleted" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.status(500).send("server error");
  }
});

module.exports = router;
