const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  value: String, //할일이 뭔지
  doneAt: Date, // 할일이 언제 완료되었는지
  order: Number, //몇번째 할일인지
});

TodoSchema.virtual("todoId").get(function () {
  return this._id.toHexString();
});

TodoSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Todo", TodoSchema);
