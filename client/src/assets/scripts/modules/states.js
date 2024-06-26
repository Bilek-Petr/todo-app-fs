import { fetchFilteredTodos, fetchTodos } from './api';
import { renderTodos } from './render';
import { countTasks } from './utility';

const filterAllButton = document.getElementById('all');
const filterRemainButton = document.getElementById('active');
const filterCompletedButton = document.getElementById('completed');
const clearCompletedButton = document.querySelector('.stats__clear');

let currentFilter = 'all';

const filterTodos = async (filterType) => {
   try {
      currentFilter = filterType; // Update current filter state
      const todos = await fetchFilteredTodos(filterType);
      console.log(`Filtered todos (${filterType}):`);
      console.log(todos);
      renderTodos(todos);
   } catch (error) {
      console.error('Error filtering todos:', error);
   }
};

// Event listeners for filter buttons
filterAllButton.addEventListener('click', async () => {
   await filterTodos('all');
   countTasks();
});

filterRemainButton.addEventListener('click', async () => {
   await filterTodos('active');
   countTasks();
});

filterCompletedButton.addEventListener('click', async () => {
   await filterTodos('completed');
   countTasks();
});

clearCompletedButton.addEventListener('click', () => {
   const completedItems = document.querySelectorAll('.tasks__item.completed');
   completedItems.forEach((item) => item.remove());
   countTasks();

   // await filterTodos(currentFilter);
});
