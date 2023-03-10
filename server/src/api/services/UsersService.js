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
          throw new Error(`User with username '${newUsername}' already exists!`);
        }

        // Update the username
        const updatedUser = await checkUser.updateOne({ username: newUsername });
        if (!updatedUser) {
          throw new Error("Username update error!");
        }

        // Check if username is updated
        const checkUpdatedUser = await User.findOne({ username: newUsername })
        if (!checkUpdatedUser) {
          throw new Error("Username has not been updated!");
        }
        
        // If all ok return updatedUser
        return checkUpdatedUser;
    }

    async updatePassword(oldPassword, newPassword, id) {

        // Check if passwords is not identic
        if (oldPassword == newPassword) {
          throw new Error("Identic Passwords!");
        }

        // Check if user exist
        const checkUser = await User.findById(id)
        if (!checkUser) {
          throw new Error(`User with id '${id}' not found!`);
        }

        // Check if old password is correct
        const checkPassword = await bcrypt.compare(oldPassword, checkUser.password);
        if (!checkPassword) {
          throw new Error("Password is not correct!")
        }

        // Generate new hashPassword
        const newHashPassword = await bcrypt.hash(newPassword, 10)
        if (!newHashPassword) {
          throw new Error("Hash password generate error!")
        }

        // Update the user password
        const updatePassword = await checkUser.updateOne({ password: newHashPassword });
        if (!updatePassword) {
          throw new Error("Password update error!");
        }

        // Get updatedUser
        const updatedUser = await User.findOne({ password: newHashPassword })
        if (!updatedUser) {
          throw new Error("Password has not been updated!");
        }

        // If all ok return updatedUser
        return updatedUser;
    }

    async updateEmail(newEmail, id) {
      
      // Check if email is not identic
      const checkUser = await User.findById(id)
      if (newEmail == checkUser.email) {
        throw new Error("Identic Email!");
      }

      // Check if email is unique
      const checkEmail = await User.findOne({ email: newEmail })
      if (checkEmail) {
        throw new Error(`User with email '${newEmail}' already exists!`);
      }

      // Update the email
      const updatedUser = await checkUser.updateOne({ email: newEmail });
      if (!updatedUser) {
        throw new Error("Email update error!");
      }

      console.log(newEmail)
      // Check if email is updated
      const checkUpdatedUser = await User.findOne({ email: newEmail })
      if (!checkUpdatedUser) {
        throw new Error("Email has not been updated!");
      }
      
      // If all ok return updatedUser
      return checkUpdatedUser;
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