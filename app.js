const express = require("express");

const db = require("./models/index");
const todosRouter = require("./routes/todos.router");
const app = express();

app.use("/api", express.json(), todosRouter);
app.use(express.static("./assets"));

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});
