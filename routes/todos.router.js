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

//할일 목록 순서 변경 API
router.patch("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { order } = req.body;

  //todoID에 해당하는 할일이 있는지 확인 후 없으면 에러 출력
  const currentTodo = await Todo.findById(todoId);
  if (!currentTodo) {
    throw new Error("존재하지 않는 todo 데이터입니다.");
  }

  //order값이 있을 때만 순서 변경
  if (order) {
    const targetTodo = await Todo.findOne({ order }).exec();
    if (targetTodo) {
      //대상과 바꿀 목표의 오더값을 변경
      targetTodo.order = currentTodo.order;
      await targetTodo.save();
    }
    //대상의 오더값을 변경
    currentTodo.order = order;
  }
  await currentTodo.save();

  res.send({});
});

module.exports = router;
