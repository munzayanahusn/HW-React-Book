const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const prisma = new PrismaClient();

const authenticateToken = require('../middlewares/authenticateToken');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10000000
    }
});

// Create a book
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    const { title, author, publisher, year, pages } = req.body;
    try {
        const filePath = req.file.path;

        const book = await prisma.book.create({
            data: {
                title,
                author,
                publisher,
                year: parseInt(year),
                pages: parseInt(pages),
                image: filePath
            }
        });
        res.json({ book });
    } catch (error) {
        res.status(400).json({ message: "Book already exist" });
    }
});

// Read all books
router.get('/', authenticateToken, async (req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
});

// Read book by id
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const book = await prisma.book.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: "Book not found" });
    }
});

// Update book by id
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, author, publisher, year, pages } = req.body;
    try {
        const book = await prisma.book.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title,
                author,
                publisher,
                year: parseInt(year),
                pages: parseInt(pages)
            }
        });
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: "Book not found" });
    }
});

// Delete book by id
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const book = await prisma.book.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: "Book not found" });
    }
});

module.exports = router;