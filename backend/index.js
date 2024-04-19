const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./src/routes/auth');
const bookRoutes = require('./src/routes/book');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  optionsSuccessStatus: 200
}));

app.use('/uploads', express.static('uploads'));
app.use('/books', bookRoutes);
app.use('/', authRoutes);

// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});