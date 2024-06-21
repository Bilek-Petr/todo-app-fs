const Todo = require('../models/Todo');

// GET all todo items
exports.getTodos = async (req, res) => {
   try {
      const todos = await Todo.find();
      res.json(todos);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

// CREATE a new todo item
exports.createTodo = async (req, res) => {
   try {
      const newTodo = new Todo({
         task: req.body.task,
      });
      const todo = await newTodo.save();
      res.json(todo);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

// UPDATE a todo item
exports.updateTodo = async (req, res) => {
   const { completed, task } = req.body;

   try {
      const updateFields = {};
      if (task !== undefined) {
         updateFields.task = task;
      }
      if (completed !== undefined) {
         updateFields.completed = completed;
      }

      const updatedTodo = await Todo.findByIdAndUpdate(
         req.params.id,
         updateFields,
         { new: true, runValidators: true } // return the updated document
      );

      if (!updatedTodo) {
         return res.status(404).json({ msg: 'Todo not found' });
      }

      res.json(updatedTodo);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

// DELETE a todo item
exports.deleteTodo = async (req, res) => {
   try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Todo removed' });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
