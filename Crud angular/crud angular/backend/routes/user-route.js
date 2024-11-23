const express = require('express');
const router = express.Router();
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('./../handlers/userHandle');

// POST /users - Add a new user
router.post('/users', async (req, res) => {
    console.log('req.body', req.body);
    try {
        const user = await addUser(req.body); // Pass user data to addUser
        res.status(201).json({ message: 'User added successfully', user }); // Return success response with the user
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Return error response
    }
});

// GET /users - Get all users
router.get('/users', async (req, res) => {
    try {
        let users = await getUsers();
        res.status(200).json(users); // Return the users list
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Return error response
    }
});

// GET /users/:id - Get a single user by ID
router.get('/users/:id', async (req, res) => {
    console.log('id', req.params['id']);
    try {
        let user = await getUser(req.params['id']);
        if (user) {
            res.status(200).json(user); // Return the user data
        } else {
            res.status(404).json({ error: 'User not found' }); // Handle user not found
        }
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Return error response
    }
});

// PUT /users/:id - Update user by ID
router.put('/users/:id', async (req, res) => {
    console.log('id', req.params['id']);
    try {
        await updateUser(req.params['id'], req.body);
        res.status(200).json({ message: 'User updated successfully' }); // Return success message
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Return error response
    }
});

// DELETE /users/:id - Delete user by ID
router.delete('/users/:id', async (req, res) => {
    console.log('id', req.params['id']);
    try {
        const deletedUser = await deleteUser(req.params['id']);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' }); // Return success message
        } else {
            res.status(404).json({ error: 'User not found' }); // Handle user not found
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Return error response
    }
});

module.exports = router;
