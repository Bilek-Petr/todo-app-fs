const express = require('express');
const router = express.Router();
const {
   getTodos,
   createTodo,
   updateTodo,
   deleteTodo,
   getFilteredTodos,
} = require('../controllers/todoController');

// GET all todo items
router.get('/', getTodos);

// GET filtered todos
router.get('/filtered', getFilteredTodos);

// CREATE a new todo item
router.post('/', createTodo);

// UPDATE a todo item
router.put('/:id', updateTodo);

// DELETE a todo item
router.delete('/:id', deleteTodo);

module.exports = router;
