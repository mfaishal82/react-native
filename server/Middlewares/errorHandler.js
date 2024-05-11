module.exports = (req, res, next) => {
    let status = error.status || 500
    let message = error.message || 'Internal server error'

    switch (error.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            status = 400
            message = error.errors[0].message
            break
        case "Unauthenticated":
        case "JsonWebTokenError":
            status = 401
            message = 'Invalid token'
            break
        case "Unauthorized":
            status = 403
            message = "Forbidden"
            break
        case "NotFound":
            status = 404
            message = "Error not found"
            break
    }

    res.status(status).json({
        message: message
    })
}