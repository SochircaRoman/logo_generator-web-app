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
            const { newUsername } = request.body
            if (newUsername == "") {
                return response.status(404).json({message: "Nothing to update"});
            }

            // Verify if id is valid and user exist
            const user = await UsersService.getUserById(request.params.id)
            if(!user){
               return response.status(404).json({ error: "User with that id no exist" })
            }

            // Update user information
            return response.status(200).json(await UsersService.updateUsername(newUsername, request.params.id));
        } catch(error){
            return response.status(500).json(JSON.stringify(error))
        }
    }

    async updatePassword(request, response){
        try{
            // Get and verify if request is not empty
            const { oldPassword, newPassword} = request.body
            if (!oldPassword && !newPassword) {
                return response.status(404).json({message: "Nothing to update"});
            }

            // Verify if id is valid and user exist
            const user = await UsersService.getUserById(request.params.id)
            if(!user){
              return response.status(404).json({ error: "User with that id no exist" })
            }

            // Update user information
            return response.status(200).json(await UsersService.updateUserPassword(oldPassword, newPassword, user));
        } catch(error){
            return response.status(500).json(JSON.stringify(error))
        }
    }

    async deleteUser(request, response){
        try{
            // Verify if id is valid and user exist
            const user = await UsersService.getUserById(request.params.id)
            if(!user){
               return response.status(404).json({ error: "User with that id no exist" })
            }

            // Delete user account and posts
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