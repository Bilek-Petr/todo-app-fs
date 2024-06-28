import './assets/scripts/main.js';
import './assets/styles/main.scss';

import { setTheme } from './assets/scripts/modules/theme.js';
import { renderTodos } from './assets/scripts/modules/render.js';
import { fetchTodos } from './assets/scripts/api.js';
import { countTasks } from './assets/scripts/modules/utility.js';
import { updateTodos } from './assets/scripts/todo-actions.js';
import { setupDragAndDrop } from './assets/scripts/modules/drag.js';

document.addEventListener('DOMContentLoaded', async () => {
   try {
      setTheme(); // Initialize theme based on saved preference
      await updateTodos(); // Update and render todos from API
      const todos = await fetchTodos(); // Fetch all todos from the API
      renderTodos(todos); // Render todos in the DOM
      countTasks(); // Count and display total number of tasks
      setupDragAndDrop(); //Ensure that onload I can drag items
   } catch (error) {
      console.error(`Error fetching todos: ${error.message}`);
   }
});
