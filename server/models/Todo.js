const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
   task: {
      type: String,
      required: true,
   },
   completed: {
      type: Boolean,
      default: false,
   },
});

module.exports = mongoose.model('Todo', TodoSchema);
