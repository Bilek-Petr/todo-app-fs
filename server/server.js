// server/server.js
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./db');
const path = require('path');
const app = express();

const todoRoutes = require('./routes/todoRoutes');
const { fetchTodos } = require('./middlewares/modifyTodos');

const PORT = process.env.PORT || 3000;

// DB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

// Routes
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.use('/tasks', todoRoutes);

// Start Server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
