const LogosService = require('../services/LogosService');

class LogosController{

    async getLogos(request, response){
        try{
            // Get logos
            const allLogos = await LogosService.getLogos()
            if(!allLogos){
                return response.status(404).json({message: "Logo storage is empty!"})
            }

            // Return all existing logos
            return response.status(200).json(allLogos)
        } catch(error){
            return response.status(400).json({ message: error.message })
        }
    }

    async saveLogo(request, response){
        try{
            // Get values
            const { name, size, path, userId } = request.body.data;

            // Check if values is present
            if (!name || !size || !path || !userId) {
                if (!name) {
                    return response.status(404).json({ message: "Name is not present" })
                } else if (!size) {
                    return response.status(404).json({ message: "Size is not present" })
                } else if (!path) {
                    return response.status(404).json({ message: "Path is not present" })
                } else {
                    return response.status(404).json({ message: "Id is not present" })
                }
            }

            // Save new logo
            const savedLogo = await UsersService.saveLogo(name, size, path, userId)
            if (!savedLogo) {
                return response.status(400).json({ message: "Logo save error!" })
            }

            // Send the succes response
            return response.status(200).json({ message: "Logo successfully saved!" });
        } catch(error){
            // Send error response
            return response.status(400).json({ message: error.message })
        }
    }

}

module.exports = new LogosController()