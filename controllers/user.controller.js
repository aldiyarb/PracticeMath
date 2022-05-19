const userService = require('../services/user.service')


module.exports = {
    authenticate,
    getAllUsers,
    register,
    getUser,
    updatePoints,
    addCompleted,
    addAttempted,
    addFavourite,
    getCompleted,
    getAttempted,
    getFavourites,
    getCurrUser,
    delFavourite,
    updateRetry
};

/*
    Middleware function to process user authentication request sent to the server
 */
function authenticate(req, res, next) {
    console.log("Authenticate():", req.body);
       userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
/*
    Middleware function to retrieve user info from the request containing the username
 */
function getUser(req, res, next) {
    userService.getUserInitials(req.params['username'])
        .then(user => res.json(user))
        .catch(err => next(err));
}
/*
    Middleware function to retrieve user info of currently logged-in user
 */
function getCurrUser(req, res, next) {
    console.log(req.user)
    userService.getByUsername(req.user.sub)
        .then(user => res.json(user))
        .catch(err => next(err));
}
/*
    Middleware function to retrieve all users information
 */
function getAllUsers(req, res, next) {
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}
/*
    Middleware function to process registration request
 */
function register(req, res, next) {
   userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
/*
    Middleware function to update the number of points of the user
 */
function updatePoints(req, res, next) {
    userService.updatePoints(req.body.points, req.user.sub)
        .then(response => {
            res.json(response)
            console.log(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
}
/*
    Middleware function to add a completed problem to the list of current user's
    completed problems
 */
function addCompleted(req, res, next) {
    userService.addCompleted(req.body, req.user.sub)
        .then(() => {
            res.json({})
            console.log("Problem complete")
        })
        .catch( err => {
            console.log(err)
            next(err)
        })
}
/*
    Middleware function to add an attempted problem to the list of current user's
    attempted problems
 */
function addAttempted(req, res, next) {
    userService.addAttempted(req.body, req.user.sub)
        .then(() => {
            res.json({})
            console.log("Problem attempted")
        })
        .catch( err => {
            console.log(err)
            next(err)
        })
}
/*
    Middleware function to add a favourite problem to the list of current user's
    favourite problems
 */
function addFavourite(req, res, next) {
    userService.addFavourite(req.body, req.user.sub)
        .then(() => {
            res.json({})
            console.log("Problem complete")
        })
        .catch( err => {
            console.log(err)
            next(err)
        })
}
/*
    Middleware function to retrieve a list of a user's completed problems
 */
function getCompleted(req, res, next) {
    userService.getCompleted(req.user.sub)
        .then(objects => {
            res.json(objects)
        })
        .catch( err => {
            next(err)
            console.log(err)
        })
}
/*
    Middleware function to retrieve a list of a user's attempted problems
 */
function getAttempted(req, res, next) {
    userService.getAttempted(req.user.sub)
        .then(objects => {
            res.json(objects)
        })
        .catch( err => {
            next(err)
            console.log(err)
        })
}
/*
    Middleware function to retrieve a list of a user's favourite problems
 */
function getFavourites(req, res, next) {
    userService.getFavourites(req.user.sub)
        .then(objects => {
            res.json(objects)
        })
        .catch( err => {
            next(err)
            console.log(err)
        })
}
/*
    Delete a problem from the current user's favourite problems
 */
function delFavourite(req, res, next) {
    console.log(req.body)
    userService.delFavourite(req.user.sub, req.body._id)
        .then(() => {
            res.json({})
        })
        .catch( err => {
            next(err)
            console.log(err)
        })
}
/*
    Update the number of problem specific retries that a user has.
 */
function updateRetry(req, res, next) {
    userService.updateRetry(req.body.retry, req.user.sub)
        .then(response => {
            res.json(response)
            console.log(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
}

