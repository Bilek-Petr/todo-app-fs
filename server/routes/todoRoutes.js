const express = require('express');
const router = express.Router();
const {
   getTodos,
   createTodo,
   updateTodo,
   deleteTodo,
} = require('../controllers/todoController');
const { getTodosFromDB } = require('../api');

// GET all todo items
router.get('/', getTodos);

// CREATE a new todo item
router.post('/', createTodo);

// UPDATE a todo item
router.put('/:id', updateTodo);

// DELETE a todo item
router.delete('/:id', deleteTodo);

// Route to fetch todos from API
router.get('/fetch-todos-from-api', getTodosFromDB);

module.exports = router;
