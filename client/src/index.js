import './assets/scripts/main.js';
import './assets/styles/main.scss';

import { setTheme } from './assets/scripts/modules/theme.js';
import { renderTodos } from './assets/scripts/modules/todo-actions.js';
import { fetchTodos } from './assets/scripts/modules/api.js';

document.addEventListener('DOMContentLoaded', async () => {
   try {
      setTheme();
      const todos = await fetchTodos();
      renderTodos(todos);
   } catch (error) {
      console.error(`Error fetching todos: ${error.message}`);
   }
});
