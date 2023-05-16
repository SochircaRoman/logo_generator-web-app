const UsersService = require('../services/UsersService');

class UsersController{

    async getUser(request, response){
        try{
            // Verify if id is valid and user exist
            const user = await UsersService.getUserById(request.params.id)
            if(!user){
                return response.status(404).json({ error: "User with that id no exist" })
            }

            // Return user information
            return response.status(200).json(user)
        } catch(error){
            return response.status(500).json(JSON.stringify(error))
        }
    }

    async getUserLogos(request, response){
        try{
            // Verify if id is valid and user exist
            const allLogos = await UsersService.getUserLogos(request.params.id)
            if(!allLogos){
                return response.status(404).json({ message: "Logo storage is empty!" })
            }

            // Return user information
            return response.status(200).json({ message: "", logos: allLogos });
        } catch(error){
            return response.status(400).json({ message: error.message })
        }
    }

    async getUsers(request, response){
        try{
            // Get all users
            const allUsers = await UsersService.getUsers()
            if(!allUsers){
                return response.status(404).json({ error: "Users no exist" })
            }

            // Return all existing users
            return response.status(200).json(allUsers)
        } catch(error){
            return response.status(500).json(JSON.stringify(error))
        }
    }

    async updateUsername(request, response){
        try{
            // Get and verify if request is not empty
            const { newUsername } = request.body.data
            if (newUsername == "") {
                return response.status(404).json({message: "Nothing to update!"});
            }

            // Update user information
            const updatedUser = await UsersService.updateUsername(newUsername, request.params.id)
            if (!updatedUser) {
                return response.status(400).json({ message: "Username update error!" })
            }

            // Send the succes response
            return response.status(200).json({ message: "Username successfully updated!", updatedUser: updatedUser });
        } catch(error){
            // Send error response
            return response.status(400).json({ message: error.message })
        }
    }

    async updatePassword(request, response){
        try{
            // Get and verify if request is not empty
            const { oldPassword, newPassword} = request.body.data
            if (!oldPassword && !newPassword) {
                return response.status(404).json({message: "Nothing to update"});
            }

            // Update user information
            const updatedUser = await UsersService.updatePassword(oldPassword, newPassword, request.params.id)
            if (!updatedUser) {
                return response.status(400).json({ message: "Password update error!" })
            }

            // Send the succes response
            return response.status(200).json({ message: "Password successfully updated", updatedUser: updatedUser });
        } catch(error){
            // Send error response
            return response.status(400).json({ message: error.message })
        }
    }

    async updateEmail(request, response){
        try{
            // Get and verify if request is not empty
            const { newEmail } = request.body.data
            if (newEmail == "") {
                return response.status(404).json({message: "Nothing to update!"});
            }

            // Update user information
            const updatedUser = await UsersService.updateEmail(newEmail, request.params.id)
            if (!updatedUser) {
                return response.status(400).json({ message: "Email update error!" })
            }

            // Send the succes response
            return response.status(200).json({ message: "Email successfully updated!", updatedUser: updatedUser });
        } catch(error){
            // Send error response
            return response.status(400).json({ message: error.message })
        }
    }

    async updateProfilePic(request, response){
        try{
            // Get and verify if request is not empty
            const { newPath } = request.body.data;
            if (newPath == "") {
                return response.status(404).json({message: "Nothing to update!"});
            }

            // Update user information
            const updatedUser = await UsersService.updateProfilePic(newPath, request.params.id)
            if (!updatedUser) {
                return response.status(400).json({ message: "Profile picture update error!" })
            }

            // Send the succes response
            return response.status(200).json({ message: "Profile picture successfully updated!", updatedUser: updatedUser });
        } catch(error){
            // Send error response
            return response.status(400).json({ message: error.message })
        }
    }

    /*
    async uploadFile(request, response){
        try{
            // Get and verify if request is not empty
            const file = request.files.file
            if (!file) {
                return response.status(400).json({ message: "Photo not found!" })
            }

            // Update user profile photo
            const updatedUser = await UploadFile.upload(file, request.params.id)
            if (!updatedUser) {
                return response.status(400).json({ message: "Profile photo update error!" });
            }

            // Send the succes response
            return response.status(200).json({ message: "Profile photo successfully updated!", updatedUser: updatedUser });
        } catch(error){
            // Send error response
            return response.status(400).json({ message: error.message })
        }
    }
    */

    async deleteUser(request, response){
        try{
            // Delete user account
            const deletedUser = await UsersService.deleteUser(request.params.id)
            if (deletedUser) {
                return response.status(200).json({ message: "User has been deleted" })
            }
            return response.status(404).json({ error: "User not been deleted" })
        } catch(error){
            return response.status(500).json(JSON.stringify(error))
        }
    }

}

module.exports = new UsersController()