const express = require('express');
const { registerCompany, getAuthToken } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerCompany);
router.post('/auth', getAuthToken);

module.exports = router;
