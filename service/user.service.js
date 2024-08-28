import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users'; // Ensure this URL matches your backend server

// Fetch users with pagination, search, and filters
export const getUsers = async (page = 1, search = '', filters = {}) => {
    const { domain, gender, available } = filters;

    let query = `?page=${page}`;
    
    if (search) {
        query += `&search=${search}`;
    }

    if (domain) {
        query += `&domain=${domain}`;
    }

    if (gender) {
        query += `&gender=${gender}`;
    }

    if (available !== undefined) {
        query += `&available=${available}`;
    }

    const response = await axios.get(`${API_URL}${query}`);
    return response.data;
};

// Fetch a single user by ID
export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Create a new user
export const createUser = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};

// Update a user
export const updateUser = async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
};

// Delete a user
export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
