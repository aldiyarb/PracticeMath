const problemService = require('../services/problem.service')
const userService = require("../services/user.service");

module.exports = {
    createProblem,
    getProblems,
    getProblem
};

/*
    Middleware function to retrieve problem information from the id in the request
 */
function getProblem(req, res, next) {
    problemService.getProblem(req.params.id)
        .then((object) => {
            res.json(object)
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
}
/*
    Middleware function to add a new problem to the database, with all
    problem information in the request
 */
function createProblem(req, res, next) {
    problemService.addProblem(req.body)
        .then((object) => {
            res.json({Created: object})
        })
        .catch(err => {
            console.log(err)
            next(err)
        });

}
/*
    Middleware function to retrieve all problems from the database
 */
function getProblems(req,res,next){
    problemService.getAllProblems()
        .then(problem => {
            res.json(problem)
        })
        .catch(err => {
            console.log("Error for problems")
            next(err)
        });
}

