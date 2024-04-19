const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();


function authenticateTokenMiddleware(req, res, next) {
  // TODO : get the token from the request headers
}


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  optionsSuccessStatus: 200
}));


// TODO : implement the upload file

app.post("/register", async (req, res) => {
  // TODO : implement the register endpoint
});

app.post("/login", async (req, res) => {
  // TODO : implement the login endpoint
});

// create a book 
app.post("/books", authenticateTokenMiddleware, upload.single('image'), async (req, res) => {
  // TODO : implement the create book endpoint
});


// get all books
app.get("/books", async (req, res) => {
  // TODO : implement the get all books endpoint
});

// edit a book
app.put("/books/:id", authenticateTokenMiddleware, async (req, res) => {
  // TODO : implement the edit book endpoint
});


// delete a book
app.delete("/books/:id", authenticateTokenMiddleware, async (req, res) => {
  // TODO : implement the delete book endpoint
});

// get book by id 
app.get("/books/:id", async (req, res) => {
  // TODO : implement the get book by id endpoint
});


// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});


