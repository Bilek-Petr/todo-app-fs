import { fetchFilteredTodos } from './api';
import { renderTodos } from './render';
import { countTasks } from './utility';

const filterAllButton = document.getElementById('all');
const filterRemainButton = document.getElementById('active');
const filterCompletedButton = document.getElementById('completed');
const clearCompletedButton = document.querySelector('.stats__clear');

export let currentFilter = 'all';

export const filterTodos = async (filterType) => {
   try {
      currentFilter = filterType; // Update current filter state
      const todos = await fetchFilteredTodos(filterType);
      console.log(`Filtered todos (${filterType}):`);
      console.log(todos);
      renderTodos(todos);
      countTasks();
   } catch (error) {
      console.error('Error filtering todos:', error);
   }
};

// Event listeners for filter buttons
filterAllButton.addEventListener('click', async () => {
   await filterTodos('all');
});

filterRemainButton.addEventListener('click', async () => {
   await filterTodos('active');
});

filterCompletedButton.addEventListener('click', async () => {
   await filterTodos('completed');
});

clearCompletedButton.addEventListener('click', async () => {
   const completedItems = document.querySelectorAll('.tasks__item.completed');
   completedItems.forEach((item) => item.remove());
   countTasks();

   await filterTodos('active');
});
