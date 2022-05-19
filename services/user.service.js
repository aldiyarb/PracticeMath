const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const {user} = require("../_helpers/role");
const {Problem} = require("../_helpers/database");
const User = db.User;


module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    addUser,
    getUserInitials,
    updatePoints,
    addCompleted,
    addAttempted,
    addFavourite,
    getCompleted,
    getAttempted,
    getFavourites,
    delFavourite,
    updateRetry

}

/*
    Mongoose document middleware function to authenticate the user from the database information
 */
async function authenticate({ username, password }) {

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}
/*
    Mongoose document middleware function to retrieve all users from the database
 */
async function getAllUsers() {
    //Returning the result of the promise.
    return await User.find().select('-hash');
}
/*
    Mongoose document middleware function to get user's first and last name from the db.
 */
async function getUserInitials(username) {
    console.log(username);
    const user = await User.findOne({username: username});
    return [user.firstName, user.lastName];
}
/*
    Mongoose document middleware function to get user information by the id from the db
 */
async function getByUsername(id) {
    const user = await User.find({_id:id});
    console.log(user);
    return user;
}
/*
    Mongoose document middleware function to add user information to the db
 */
async function addUser(userParam) {

    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}
/*
    Mongoose document middleware function to update user retries
 */
async function updateRetry(retry, userId) {
    return User.updateOne({_id: userId}, {$set: {retry: retry}})
}
/*
    Mongoose document middleware function to update user points
 */
async function updatePoints(points, id) {
    console.log(points);
    return await User.updateOne({_id: id}, {$set: {points: points}});
}
/*
    Mongoose document middleware function to add a completed problem in the db for the current user
 */
async function addCompleted(problem, id) {
    const user = await User.findOne({_id: id});
    const problems = user.completed;
    if (!problems.includes(problem._id)) {
        return await User.updateOne({_id: id}, {$push: {completed: problem}});
    }
}
/*
    Mongoose document middleware function to add an attempted problem in the db for the current user
 */
async function addAttempted(problem, id) {
    const user = await User.findOne({_id: id});
    const problems = user.attempted;
    if (!problems.includes(problem._id)) {
        return await User.updateOne({_id: id}, {$push: {attempted: problem}});
    }
}
/*
    Mongoose document middleware function to add a completed problem in the db for the current user
 */
async function addFavourite(problem, id) {
    const user = await User.findOne({_id: id});
    const problems = user.favourite;
    if (!problems.includes(problem._id)) {
        return await User.updateOne({_id: id}, {$push: {favourite: problem}});
    }
}
/*
    Mongoose document middleware function to get all completed problems in the db for the current user
 */
async function getCompleted(id) {
    const user = await User.findOne({_id: id});
    return user.completed;
}
/*
    Mongoose document middleware function to get all attempted problems in the db for the current user
 */
async function getAttempted(id) {
    const user = await User.findOne({_id: id});
    return user.attempted;
}
/*
    Mongoose document middleware function to get all favourite problems in the db for the current user
 */
async function getFavourites(id) {
    const user = await User.findOne({_id: id});
    return user.favourite;
}
/*
    Mongoose document middleware function to delete a favourite problem in the db for the current user
 */
async function delFavourite(userId, problem) {
    return User.updateOne({_id: userId}, {$pull: {favourite: problem}})
}




