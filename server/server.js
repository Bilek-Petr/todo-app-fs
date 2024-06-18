const express = require('express');
const path = require('path');
const connectDB = require('./db');
const Todo = require('./models/Todo');
const app = express();
const PORT = process.env.PORT || 3000;

//DB
connectDB();

//Middleware
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the client public folder
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
   res.render('index');
});

//GET all todo items
app.get('/api/todos', async (req, res) => {
   try {
      const todos = await Todo.find();
      res.json(todos);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

//CREATE a new TODO items
app.post('/api/todos', async (req, res) => {
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
});

//UPDATE a TODO items
app.put('/api/todos/:id', async (req, res) => {
   const { completed, task } = req.body;

   try {
      // Prepare fields to update based on what's provided in the request body
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

      //send the updated todo items as response
      res.json(updatedTodo);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

//DELETE a TODO items
app.delete('/api/todos/:id', async (req, res) => {
   try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Todo removed' });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
