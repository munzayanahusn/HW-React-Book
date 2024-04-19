const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

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

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "User Not Found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid Password" });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ token });
  
    }
    catch (err) {
      console.log(err);
      res.status(400).json({ message: "Invalid Credentials" });
    }
});

module.exports = router;