const Team = require('../models/team');
const User = require('../models/User');

// @desc Create a new team with unique domain members
// @route POST /api/team
const createTeam = async (req, res) => {
    const { name, members } = req.body;

    const uniqueDomains = new Set();
    const uniqueMembers = [];

    for (let memberId of members) {
        const member = await User.findById(memberId);
        if (member && !uniqueDomains.has(member.domain) && member.available) {
            uniqueDomains.add(member.domain);
            uniqueMembers.push(member._id);
        }
    }

    try {
        // Create a new team without manually setting an `id`
        const team = new Team({ name, members: uniqueMembers });
        const createdTeam = await team.save();
        res.status(201).json(createdTeam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// @desc Get team details by ID
// @route GET /api/team/:id
const getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('members');
        if (team) {
            res.json(team);
        } else {
            res.status(404).json({ message: 'Team not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTeam,
    getTeamById
};
