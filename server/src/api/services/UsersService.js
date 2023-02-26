const User = require("../../database/models/User");

const bcrypt = require('bcryptjs');

class UsersService {

    async getUserById(id) {
        const existingUser = await User.findById(id)
        if (!existingUser) {
          throw new Error(`User with id '${id}' not found`);
        }
        return existingUser;
    }

    async getAllUsers() {
        const allUsers = await User.find()
        if (!allUsers) {
          throw new Error("No user found");
        }
        return allUsers;
    }

    async updateUsername(newUsername, id) {

        // Check if username is not identic
        const checkUser = await User.findById(id)
        if (newUsername == checkUser.username) {
          throw new Error("Identic Username!");
        }

        // Check if username is unique
        const checkUsername = await User.findOne({ username: newUsername })
        if (checkUsername) {
          throw new Error(`User with username '${username}' already exists`);
        }

        // Update the username
        const updatedUser = await checkUser.updateOne({ username: newUsername });
        if (!updatedUser) {
          throw new Error("Username update error");
        }
        
        // If all ok return updatedUser
        return checkUser;
    }

    async updatePassword(oldPassword, newPassword, id) {

        // Verify if id is valid and user exist
        const existingUser = await User.findById(id)
        if (!existingUser) {
          throw new Error(`User with id '${id}' not found`);
        }

        // Check if old password is correct
        const checkPassword = await bcrypt.compare(oldPassword, existingUser.password);
        if (!checkPassword) {
          throw new Error("Password is not correct")
        }

        // Generate new hashPassword
        const newHashPassword = await bcrypt.hash(newPassword, 10)
        if (!newHashPassword) {
          throw new Error("Hash password generate error")
        }

        // Update the user password
        const updatedUser = await existingUser.update({ password: newHashPassword });
        if (!updatedUser) {
          throw new Error("Password update error");
        }

        return updatedUser;
    }

    async deleteUser(id) {

      // Verify if id is valid and user exist
      const existingUser = await User.findById(id)
      if (!existingUser) {
        throw new Error(`User with id '${id}' not found`);
      }

      // Delete user account
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
        throw new Error("Delete user error");
      }
      return deletedUser;
    }
}

module.exports = new UsersService()