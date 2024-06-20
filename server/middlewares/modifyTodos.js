const { getTodosFromDB } = require('../api');

exports.fetchTodos = async (req, res, next) => {
   try {
      const todos = await getTodosFromDB();
      req.todos = todos;
      next();
   } catch (error) {
      console.error('Error fetching todos from API:', error);
      res.status(500).send('Error retrieving tasks');
   }
};
