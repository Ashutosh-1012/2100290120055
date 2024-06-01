const axios = require('axios');

const TEST_SERVER_URL = 'http://20.244.56.144/test';

const fetchNumbers = async (type) => {
    let url = `${TEST_SERVER_URL}/${type}`;
    try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers || [];
    } catch (error) {
        console.error('Error fetching numbers:', error.message);
        return [];
    }
};

module.exports = fetchNumbers;
