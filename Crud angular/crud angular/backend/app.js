const express = require('express');
const mongoose = require('mongoose');
const userRoutes=require('./routes/user-route');
const app = express();
const port = 3000;
var cors = require('cors');

app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('running');
});
app.use(userRoutes);


// MongoDB connection function
async function connectDb() {
  try {
      await mongoose.connect('mongodb://localhost:27017', {
          dbName: 'UsersDb', // Specify the database name
      });
      console.log('Connected to MongoDB');
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
  }
}

// Connect to the database
connectDb();

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
