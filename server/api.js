//API
const axios = require('axios');

const getTodosFromDB = async () => {
   try {
      const response = await axios.get('http://localhost:3000/tasks');
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      return response.data;
   } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).send('Error fetching todos from API');
      return [];
   }
};

module.exports = { getTodosFromDB };
