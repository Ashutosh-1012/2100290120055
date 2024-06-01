const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    companyName: String,
    clientID: String,
    clientSecret: String,
    ownerName: String,
    ownerEmail: String,
    rollNo: String,
    password: String // Add password field
});

const Credential = mongoose.model('Credential', credentialSchema);

module.exports = Credential;
