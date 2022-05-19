const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problem.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');
//Routing for problem services
router.get('/getproblems', problemController.getProblems);
router.post('/addproblems', authorize(Role.admin), problemController.createProblem);
router.get('/:id', problemController.getProblem);
module.exports = router;
