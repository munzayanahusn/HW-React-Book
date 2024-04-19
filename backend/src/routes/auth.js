const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        });
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ message: "This user already exists" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    // Check password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }

    // Get token
    const token = jwt.sign(
        { userId: user.id }, 
        process.env.JWT_SECRET
    );
    res.json({ token });
});