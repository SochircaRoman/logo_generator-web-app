const Logo = require("../../database/models/Logo");
const User = require("../../database/models/User");

class LogosService {

    async getLogos() {
        const allLogos = await Logo.find()
        if (!allLogos) {
          throw new Error("No logo found");
        }
        return allLogos;
    }

    
    async saveLogo(name, size, path, userId) {
      
      // Check if user exist
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

    async deleteLogo(id) {

      // Verify if id is valid and logo exist
      const checkLogo = await Logo.findById(id)
      if (!checkLogo) {
        throw new Error(`Logo with id '${id}' not found`);
      }

      // Delete logo
      const deletedLogo = await Logo.findByIdAndDelete(id)
      if (!deletedLogo) {
        throw new Error("Logo delete error");
      }
      return deletedLogo;
    }

}

module.exports = new LogosService()