const express = require('express');
const { createTeam, getTeamById } = require('../controllers/teamController');
const router = express.Router();

router.route('/')
    .post(createTeam)
    

router.route('/:id')
    .get(getTeamById);
    

module.exports = router;
