const User = require('./../db/user'); // Adjust path as necessary

// Add a new user
async function addUser(userModel) {
    try {
        const user = new User({
            ...userModel, // Spread incoming user data into a new User instance
        });
        await user.save(); // Save the user to the database
        return user.toObject(); // Return the saved user as a plain object
    } catch (error) {
        console.error('Error in addUser:', error);
        throw error; // Re-throw error for the caller to handle
    }
}

// Get all users
async function getUsers() {
    try {
        const users = await User.find(); // Find all users
        return users.map(x => x.toObject()); // Return users as plain objects
    } catch (error) {
        console.error('Error in getUsers:', error);
        throw error; // Re-throw error for the caller to handle
    }
}

// Get a specific user by ID
async function getUser(id) {
    try {
        const user = await User.findById(id); // Find user by ID
        if (!user) {
            throw new Error('User not found'); // Handle user not found
        }
        return user.toObject(); // Return the user as a plain object
    } catch (error) {
        console.error('Error in getUser:', error);
        throw error; // Re-throw error for the caller to handle
    }
}

// Update user details
async function updateUser(id, userModel) {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, userModel, { new: true }); // Find user and update
        if (!updatedUser) {
            throw new Error('User not found for update');
        }
        return updatedUser.toObject(); // Return the updated user as a plain object
    } catch (error) {
        console.error('Error in updateUser:', error);
        throw error; // Re-throw error for the caller to handle
    }
}

// Delete a user
async function deleteUser(id) {
    try {
        const deletedUser = await User.findByIdAndDelete(id); // Find user and delete
        if (!deletedUser) {
            throw new Error('User not found for deletion');
        }
        return deletedUser.toObject(); // Return the deleted user as a plain object
    } catch (error) {
        console.error('Error in deleteUser:', error);
        throw error; // Re-throw error for the caller to handle
    }
}

module.exports = { addUser, getUsers, getUser, updateUser, deleteUser };
