const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./db');
const path = require('path');
const ejsMate = require('ejs-mate');
const todoRoutes = require('./routes/todoRoutes');
const { getTodosFromDB } = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

// DB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS Setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', async (req, res) => {
   try {
      const todos = await getTodosFromDB();
      res.render('index', { todos });
   } catch (error) {
      console.error('Error fetching todos from API:', error);
      res.status(500).send('Error retrieving tasks');
   }
});

app.use('/tasks', todoRoutes);

// Start Server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
