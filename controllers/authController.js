const axios = require('axios');
const jwt = require('jsonwebtoken');
const Credential = require('../models/Credential');
const TEST_SERVER_URL = 'http://20.244.56.144/test';
const JWT_SECRET = 'your_jwt_secret'; // Use a secure secret in production

const registerCompany = async (req, res) => {
    const registrationData = req.body;
    try {
        const response = await axios.post(`${TEST_SERVER_URL}/register`, registrationData);
        const credentials = new Credential({ ...response.data, password: registrationData.password });
        await credentials.save();
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', message: error.message });
    }
};

const getAuthToken = async (req, res) => {
    const { username, password } = req.body;
    try {
        const credentials = await Credential.findOne({ ownerEmail: username });
        if (!credentials || credentials.password !== password) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: credentials.ownerEmail }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Authorization failed', message: error.message });
    }
};

module.exports = { registerCompany, getAuthToken };
