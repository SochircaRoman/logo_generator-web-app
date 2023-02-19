const jwt = require("jsonwebtoken");

class AuthMiddleware {
    async adminAuth(request, response, next){
        try {
            // Get the jwt accesToken
            const accesToken = request.headers["x-access-token"];

            // Verify if token is present
            if (!accesToken) {
                return response.status(401).json({ message: "You are not logged in! Please login in to continue" })
            }

            // Verify token
            jwt.verify(accesToken, process.env.JWT_ACCESS_SECRET, (error, decodedToken) => {
                if (error) {
                    return response.status(401).json({ message: "Not authorized" })
                } else {
                    if (decodedToken.adminRoot) {
                        next()
                    } else {
                        // If admin_root is false
                        return response.status(401).json({ message: "Not authorized, only admin" })
                    }
                }
            });
        } catch (error) {
            return await response.status(500).json(JSON.stringify(error))
        }
    }

    async userAuth(request, response, next){
        try {
            // Get the jwt accesToken
            const accesToken = request.headers["x-access-token"];

            // Verify if token is present
            if (!accesToken) {
                return response.status(401).json({ message: "You are not logged in! Please login in to continue" })
            }

            // Verify token
            jwt.verify(accesToken, process.env.JWT_ACCESS_SECRET, (error, decodedToken) =>{
                if (error) {
                    return response.status(401).json({ message: "Not authorized" })
                } else {
                    if (decodedToken.adminRoot) {
                        return response.status(401).json({ message: "Not authorized, token not available" })
                    } else {
                        next()
                    }
                }
            });
        } catch (error) {
            // If token is not available
            return await response.status(500).json(JSON.stringify(error))
            
        }
    }
}

module.exports = new AuthMiddleware()