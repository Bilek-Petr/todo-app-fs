import './assets/scripts/main.js';
import './assets/styles/main.scss';

import { setTheme } from './assets/scripts/modules/theme.js';
import { renderTodos } from './assets/scripts/modules/render.js';
import { fetchTodos } from './assets/scripts/modules/api.js';
import { countTasks } from './assets/scripts/modules/utility.js';
import { updateTodos } from './assets/scripts/modules/todo-actions.js';

document.addEventListener('DOMContentLoaded', async () => {
   try {
      setTheme();
      updateTodos();
      const todos = await fetchTodos();
      renderTodos(todos);
      countTasks();
   } catch (error) {
      console.error(`Error fetching todos: ${error.message}`);
   }
});
