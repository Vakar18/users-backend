
<h4>Project Name: Team Management Backend</h4>

<h5>Description</h5>

<p>This is the backend for the Team Management application. It provides RESTful API endpoints for managing teams and users. The backend is built using Node.js, Express, and MongoDB.</p>

<h5> ✨ Features</h5>

<li>Create a new team with unique domain members.</li>
<li>Retrieve team details by ID.</li>
<li>Ensures team members have unique domains within a team.</li>

## 🛠️ **Technologies Use**

- Node.js
- Express
- MongoDB
- Mongoose

## ⚙️ **Prerequisites**
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## 🚀 **Installation**

1. Clone the repository:
   git clone https://github.com/vakar18/users-backend.git
   cd users-backend
2. Install dependencies:
   npm install
3. Set up environment variables:
   Create a .env file in the root directory and add the following:
   MONGO_URI=mongodb://localhost:27017/userdatabase
   PORT=3000
   Replace MONGO_URI with your MongoDB connection string if it's different.

## 🏃‍♂️ **Running the Backend Locally**

1. Start the MongoDB server:
   mongod
2. Start the Node.js server:
   npm start
3. Import the data.json from seed.js file
   node seed.js
4. The backend API will be available at http://localhost:3000/api/users

## 📚 **API Endpoints**

- GET /api/users: Get the list of the users.
- POST /api/team: Create a new team.
- GET /api/team/:id: get the list a particular team.

## 🗂️ **Project Structure**

- models/: Mongoose schemas for Team and User.
- controllers/: Functions to handle requests and responses.
- routes/: Defines the routes for the API.
- app.js: The main entry point for the application.

## **License**
This project is licensed under the MIT License.
#   u s e r s - b a c k e n d 
 
 
