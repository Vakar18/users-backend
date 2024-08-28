const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const teamRoutes = require('./routes/team.routes');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
