// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');



const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/auth_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/User'); 

app.post('/signup', async (req, res) => {
    try {

      const { username, password } = req.body;
  
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ username, password: hashedPassword });
  
      const createdUser = await newUser.save();

       const token = jwt.sign({ userId: createdUser._id }, 'pro-net-gaming', {
        expiresIn: '1h', 
      });
  
      res.status(200).json({ token });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'pro-net-gaming', {
        expiresIn: '1h', 
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
