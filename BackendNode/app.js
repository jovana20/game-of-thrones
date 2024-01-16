// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// ...

// Use the 'cors' middleware to enable CORS

const app = express();
const port = process.env.PORT || 3000;

// Use bodyParser middleware for parsing JSON
app.use(bodyParser.json());
app.use(cors());


// Configure mongoose to connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/auth_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/User'); // Import the User model

app.post('/signup', async (req, res) => {
    try {

      const { username, password } = req.body;
  
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ username, password: hashedPassword });
  
      // Save the user to the database
      const createdUser = await newUser.save();

       // Generate a JWT token for the user
       const token = jwt.sign({ userId: createdUser._id }, 'your-secret-key', {
        expiresIn: '1h', // Token expires in 1 hour
      });
  
      res.status(200).json({ token });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '1h', // Token expires in 1 hour
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
