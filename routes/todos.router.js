const express = require("express");
const Todo = require("../models/todo");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi!");
});

//할일 생성 API
router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();

  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;

  const todo = new Todo({ value, order });
  await todo.save();
  res.send({ todo });
});

//할일 목록 조회 API
router.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort("-order").exec();

  res.send({ todos });
});

module.exports = router;
