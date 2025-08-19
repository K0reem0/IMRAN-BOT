// lib/register.js
const fs = require('fs');
const path = './data/users.json';

// Ensure 'data' folder exists
if (!fs.existsSync('./data')) fs.mkdirSync('./data');

// Ensure 'users.json' exists
if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));

// Load users
let users = JSON.parse(fs.readFileSync(path));

// Save users to file
function saveUsers() {
    fs.writeFileSync(path, JSON.stringify(users, null, 2));
}

// Register a user if not exists
function registerUser(jid, name) {
    if (!users[jid]) {
        users[jid] = {
            name: name || 'Unknown',
            registeredAt: new Date().toISOString(),
            messages: 0,
            commands: 0
        };
        saveUsers();
    }
}

// Update user stats (messages and commands)
function updateUserStats(jid, messages = 0, commands = 0) {
    if (!users[jid]) registerUser(jid);
    users[jid].messages += messages;
    users[jid].commands += commands;
    saveUsers();
}

// Get user info
function getUser(jid) {
    return users[jid] || null;
}

module.exports = {
    registerUser,
    updateUserStats,
    getUser
};
