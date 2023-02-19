const User = require("../../database/models/User");

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

class AuthService {

    async register(username, password, email) {

        // Check if username is unique
        const checkUsername = await User.findOne({ username: username })
        if (checkUsername) {
          throw new Error(`User with username '${username}' already exists`);
        }

        // Check if email is unique
        const checkEmail = await User.findOne({ email: email })
        if (checkEmail) {
          throw new Error(`User with email '${email}' already exists`)
        }

        // Create hash password
        const hashPassword = await bcrypt.hash(password, 10)
        if (!hashPassword) {
            throw new Error("Hash password generate error")
        }

        // Generate activation link
        const activationLink = uuid.v4()
        if (!activationLink) {
            throw new Error("Activation link generate error")
        }

        // Create a new user
        const newUser = await User.create({ 
          username: username,
          password: hashPassword,
          email: email,
          activationLink: activationLink
        })

        // Check if new user was created
        if (!newUser) {
          throw new Error("User create error")
        }

        // If all ok return new user
        return {newUser}
    }

    async login(username, password) {

      // Get user by username
      const existingUser = await User.findOne({ username: username })
      if (!existingUser) {
        throw new Error(`User with username '${username}' not be found`);
      }

      // Check if actual password is correct
      const correctPassword = await bcrypt.compare(password, existingUser.password);
      if (!correctPassword) {
        throw new Error("Password is not correct")
      }

      // Create access token for logged user
      const accessToken = jwt.sign(
        {
          "username": username,
          "adminRoot": existingUser.adminRoot
        },
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '24h'}
      );

      // Check if accessToken is generated
      if (!accessToken) {
        throw new Error("Access Token generate error")
      }

      // If all ok return accessToken and the existingUser
      return {existingUser, ...accessToken}
    }

}

module.exports = new AuthService()