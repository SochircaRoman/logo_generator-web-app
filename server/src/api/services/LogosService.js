const Logo = require("../../database/models/Logo");

const bcrypt = require('bcryptjs');

class UsersService {

    async getLogos() {
        const allLogos = await Logo.find()
        if (!allLogos) {
          throw new Error("No logo found");
        }
        return allLogos;
    }

    
    async saveLogo(name, size, path, userId) {
      
      // Check if user exist
      console.log(userId);
      const checkUser = await User.findById(userId)
      if (!checkUser) {
        throw new Error(`User with id '${userId}' not found!`);
      }

      // Save new logo
      const newLogo = await Logo.create({ 
        name: name,
        size: size,
        path: path,
        userId: userId,
      })

      // Check if new logo was saved
      if (!newLogo) {
        throw new Error("Logo save error")
      }
      
      // If all ok return true
      return true;
    }

}

module.exports = new UsersService()