export const setupDragAndDrop = () => {
   const itemList = document.querySelector('.tasks');
   const items = [...itemList.querySelectorAll('.tasks__item')];

   // Add dragstart and dragend event listeners to each item
   items.forEach((item) => {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
   });

   // Initialize the drag-and-drop functionality
   itemList.addEventListener('dragover', handleDragOver);
   itemList.addEventListener('dragenter', preventDefaultAction);

   function handleDragStart() {
      this.classList.add('dragging');
   }

   function handleDragEnd() {
      this.classList.remove('dragging');
   }

   function handleDragOver(e) {
      e.preventDefault();
      const draggingItem = itemList.querySelector('.tasks__item.dragging');
      const siblings = [...itemList.querySelectorAll('.tasks__item:not(.dragging)')];

      const nextSibling = findNextSibling(e.clientY, siblings);

      if (nextSibling) {
         // Calculate translateY value for smooth movement
         const translateY = `${nextSibling.offsetTop - draggingItem.offsetTop}px`;
         draggingItem.style.setProperty('--translateY', translateY);
         itemList.insertBefore(draggingItem, nextSibling.element);
      } else {
         itemList.appendChild(draggingItem); // If no next sibling found, append at the end
      }
   }

   function findNextSibling(mouseY, siblings) {
      // get the mid position of siblings
      const siblingPositions = siblings.map((sibling) => ({
         element: sibling,
         middle:
            sibling.getBoundingClientRect().top +
            sibling.getBoundingClientRect().height / 2,
      }));

      // Find the sibling based on mouse position
      return siblingPositions.find((sibling) => mouseY <= sibling.middle);
   }

   function preventDefaultAction(e) {
      e.preventDefault();
   }
};
