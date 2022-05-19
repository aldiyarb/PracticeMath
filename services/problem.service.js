const db = require('../_helpers/database');
const {user} = require("../_helpers/role");
const {getAllUsers, getByUsername} = require("./user.service");
const {getUser} = require("../controllers/user.controller");
const {ObjectId} = require("mongoose/lib/types");
const Problem = db.Problem;
const User = db.User;

module.exports = {
    getAllProblems,
    addProblem,
    getProblem
}



async function getProblem(id) {

    let problem = await Problem.findOne({_id : ObjectId(id)});
    if (problem == null) {
    }
    else {
        console.log(problem);
        return problem;
    }

}

async function getAllProblems() {
    return await Problem.find({});
}

async function addProblem(problem) {
    dbProblem = new Problem(problem);
    await dbProblem.save();
}


