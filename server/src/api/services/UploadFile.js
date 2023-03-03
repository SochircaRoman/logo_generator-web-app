const User = require("../../database/models/User");
const uuid = require("uuid")
const path = require("path")

class UploadFile {

  async upload(file, id) {

    // Check if user exist
    const checkUser = await User.findById(id)
    if (!checkUser) {
      throw new Error(`User with id '${id}' not found!`);
    }

    // Check if file extensions are valid
    const extensionName = path.extname(file.name);
    const allowedExtension = ['.png','.jpg','.jpeg'];
    if(!allowedExtension.includes(extensionName)){
      throw new Error("Invalid format!");
    }

    // Generate a unique file path
    const imageName = `${uuid.v4()}${extensionName}`
    const imagePath = path.resolve("src/api/static", imageName)

    // Save the photo
    file.mv(imagePath)

    // Update the user profilePath
    const updatedUser = await checkUser.updateOne({ profilePic: imagePath });
    if (!updatedUser) {
      throw new Error("Photo update error!");
    }

    // Check if email is updated
    const checkUpdatedUser = await User.findOne({ profilePic: imagePath })
    if (!checkUpdatedUser) {
      throw new Error("Photo has not been updated!");
    }
    
    // If all ok return updatedUser
    return checkUpdatedUser;
  }
}

module.exports = new UploadFile()