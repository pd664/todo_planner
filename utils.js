var jwt = require('jsonwebtoken');

function generateToken(user) {
    let details = {
        userId: user.id,
        name: user.name,
        username: user.username,
        email: user.email
    }
    // console.log("details", details)
    return jwt.sign(details, 'ABCDEF$123', {
        expiresIn: 60 * 60 * 24 
    })
}

function userDetails(user) {
    if(!user) return;
    return {
        userId: user.id,
        name: user.name,
        username: user.username,
        email: user.email
    }
}

module.exports.generateToken = generateToken
module.exports.userDetails = userDetails