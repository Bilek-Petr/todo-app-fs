import { fetchTodos, createTodo, deleteTodo, updateTodo } from './api';
import { renderTodos } from './modules/render';
import { countTasks, showInvalidInput, clearInvalidInput } from './modules/utility';
import { currentFilter, filterTodos } from './states';

const taskInput = document.querySelector('.header__input');
const tasksContainer = document.querySelector('.tasks');

//updating todos to render innerHTML
export const updateTodos = async () => {
   console.log('Updating todos...');
   const todos = await fetchTodos();
   renderTodos(todos);
   countTasks();
};

// Task Create
const handleTaskInput = async (e) => {
   const task = e.target.value.trim();
   if (!task) return;

   const todo = { task };
   console.log('Sending todo:', todo);

   try {
      await createTodo(todo);
      console.log('Task created successfully');

      //ensure it stays on filtered state, instead of seeing all when modified
      await filterTodos(currentFilter);
   } catch (error) {
      console.error('Error:', error.message);
   }
};

// Task Delete
tasksContainer.addEventListener('click', async (e) => {
   if (e.target.classList.contains('delete-icon')) {
      const taskId = e.target.closest('.tasks__item').id;

      try {
         await deleteTodo(taskId);
         console.log('Task deleted successfully');

         //ensure it stays on filtered state, instead of seeing all when modified
         await filterTodos(currentFilter);
      } catch (error) {
         console.error('Error:', error.message);
      }
   }
});

// Function to handle changes in task text content
async function handleTaskTextChange(taskTextElement) {
   const taskId = taskTextElement.closest('.tasks__item').id;
   let newTask = taskTextElement.textContent.trim();

   // Enforce maximum length of 100 characters
   if (newTask.length > 100) {
      newTask = newTask.slice(0, 100);
      taskTextElement.textContent = newTask;
   }

   // Validate if task description is empty
   const isEmpty = newTask.length === 0;
   if (isEmpty) {
      showInvalidInput(taskTextElement);
      console.warn('Task description cannot be empty');
      return;
   } else {
      clearInvalidInput(taskTextElement);
   }

   try {
      await updateTodo(taskId, { task: newTask });
      console.log('Task updated successfully');
   } catch (error) {
      console.error('Error updating task:', error.message);
   }
}

//----------------------------------------------------------------
//LISTENERS
//----------------------------------------------------------------
taskInput.addEventListener('keyup', (e) => {
   if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleTaskInput(e);
      taskInput.value = '';
   }
});

tasksContainer.addEventListener('input', async (e) => {
   if (e.target.classList.contains('tasks__text')) {
      handleTaskTextChange(e.target);
   }
});
