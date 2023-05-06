const User = require("../../database/models/User");
const path = require("path");

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

    // Create a unique file name using id
    const imageName = `user_${id}.png`;

    // Create a path for database
    const databasePath = `${process.env.STATIC_IMAGE_PATH}${imageName}`
    
    // Save the photo
    const imagePath = path.resolve("src/api/static", imageName);
    file.mv(imagePath)

    // Update the user profilePath
    const updatedUser = await checkUser.updateOne({ profilePic: databasePath });
    if (!updatedUser) {
      throw new Error("Photo update error!");
    }

    // Check if email is updated
    const checkUpdatedUser = await User.findOne({ profilePic: databasePath })
    if (!checkUpdatedUser) {
      throw new Error("Photo has not been updated!");
    }
    
    // If all ok return updatedUser
    return checkUpdatedUser;
  }
}

module.exports = new UploadFile()