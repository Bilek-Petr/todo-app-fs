import { fetchTodos, createTodo, deleteTodo } from './api';
import { renderTodos } from './render';
import { countTasks } from './utility';

const taskInput = document.querySelector('.header__input');
const tasksContainer = document.querySelector('.tasks');

// Task Create
const handleTaskInput = async (e) => {
   const task = e.target.value.trim();
   if (!task) return;

   const todo = { task };
   console.log('Sending todo:', todo);

   try {
      await createTodo(todo);
      console.log('Task created successfully');
      updateTodos();
   } catch (error) {
      console.error('Error:', error.message);
   }
};

//updating todos to render innerHTML
export const updateTodos = async () => {
   const todos = await fetchTodos();
   renderTodos(todos);
   countTasks();
};

// Task Delete
tasksContainer.addEventListener('click', async (e) => {
   if (e.target.classList.contains('delete-icon')) {
      const taskId = e.target.closest('.tasks__item').id;

      try {
         await deleteTodo(taskId);
         console.log('Task deleted successfully');
         updateTodos();
      } catch (error) {
         console.error('Error:', error.message);
      }
   }
});

//----------------------------------------------------------------
//LISTENERS
//----------------------------------------------------------------
taskInput.addEventListener('keyup', (e) => {
   if (e.code === 'Enter') {
      handleTaskInput(e);
      taskInput.value = '';
   }
});
