const User = require('../models/User');

// @desc Get all users with pagination, filtering, and search
// @route GET /api/users
const getUsers = async (req, res) => {
    const { page = 1, limit = 20, search, domain, gender, available } = req.query;

    const query = {};

    if (search) {
        query.$or = [
            { first_name: { $regex: search, $options: 'i' } },
            { last_name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }
    if (domain) {
        query.domain = domain;
    }
    if (gender) {
        query.gender = gender;
    }
    if (available !== undefined) {
        query.available = available === 'true';
    }

    try {
        const users = await User.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await User.countDocuments(query);

        res.json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get a specific user by ID
// @route GET /api/users/:id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Create a new user
// @route POST /api/users
const createUser = async (req, res) => {
    const { first_name, last_name, email, domain, gender, available, avatar } = req.body;

    try {
        const user = new User({ first_name, last_name, email, domain, gender, available, avatar });
        const createdUser = await user.save();
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update an existing user
// @route PUT /api/users/:id
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.first_name = req.body.first_name || user.first_name;
            user.last_name = req.body.last_name || user.last_name;
            user.domain = req.body.domain || user.domain;
            user.email = req.body.email || user.email;
            user.gender = req.body.gender || user.gender;
            user.available = req.body.available || user.available;
            user.avatar = req.body.avatar || user.avatar;

            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete a user
// @route DELETE /api/users/:id
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
