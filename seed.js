const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const dataPath = path.join(__dirname, 'data.json');

const importData = async () => {
    try {
        await User.deleteMany(); // Clear existing data
        
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8')); // Read and parse the JSON file
        await User.insertMany(data); // Insert the data into the database

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
