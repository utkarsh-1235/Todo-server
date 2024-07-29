const AppError = require('../Utils/error.utils');
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError('Unauthenticated, please login again', 401));
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = userDetails;

    next();
}


module.exports = {
    isLoggedIn,
}
