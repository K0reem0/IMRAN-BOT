const fs = require('fs');
const path = require('path');
const { addWelcome, delWelcome, isWelcomeOn, addGoodbye, delGoodBye, isGoodByeOn } = require('../lib/index');

// Emoji pools
const sparkles = ['✨','🌟','💫','🎇','🎆','🔥','⭐','💎','🌈','🌠'];
const confetti = ['🎉','🎊','🥳','🎈','🎀','🎁','🪅','🎶'];
const arrows = ['➡️','➤','🔹','🔸','⚡','🎯','⏩','🡆'];

// Helper to pick random emojis
function pickRandom(list, count=5) {
    let result = '';
    for(let i=0;i<count;i++) result += list[Math.floor(Math.random()*list.length)] + ' ';
    return result.trim();
}

function randomInt(max) { return Math.floor(Math.random()*max); }

// 10 funny/pro welcome messages
const welcomeTexts = [
    "💥 Hold tight! {user} just landed in our group! 🛬",
    "🎉 Party alert! {user} joined the madness! 🥳",
    "👋 Hey hey! {user} is here to spice things up! 🌶️",
    "⚡ Warning! {user} entered – chaos may ensue! 😂",
    "✨ New legend in town: {user}! Bow down! 🤩",
    "🎈 Guess who? {user} just arrived! Make some noise! 🔊",
    "💫 Incoming! {user} is here to break the chat! 💣",
    "🔥 ALERT! {user} joined. The fun just doubled! 🤪",
    "🎊 Everyone welcome {user} – the hype is real! 💥",
    "⭐ Behold! {user} appears. Enjoy the show! 🎬"
];

// 10 funny/pro goodbye messages
const goodbyeTexts = [
    "💔 Oh no! {user} left the party! 🥲",
    "😢 Farewell, {user}. The chaos dims… for now! 😎",
    "👋 Bye bye {user}! Don’t forget us! 💌",
    "⚡ Whoosh! {user} vanished from the chat! 👻",
    "✨ {user} left… the legends will miss you! 🏆",
    "🎈 Goodbye {user}! The confetti still falls… 🎉",
    "💫 {user} exits stage left. Curtain closes! 🎭",
    "🔥 Alert! {user} left – things just got calmer! 😂",
    "🎊 Sad times! {user} left the group. Peace out! ✌️",
    "⭐ {user} has departed. Remember us fondly! 🌟"
];

// Generate banner with random text
function generateBanner(type, userName, memberCount) {
    const sparkleLine = pickRandom(sparkles, randomInt(8)+5);
    const confettiLine = pickRandom(confetti, randomInt(6)+4);
    const arrow = arrows[randomInt(arrows.length)];

    let messageLine = "";
    if(type === 'welcome') {
        messageLine = welcomeTexts[randomInt(welcomeTexts.length)].replace("{user}", userName);
    } else {
        messageLine = goodbyeTexts[randomInt(goodbyeTexts.length)].replace("{user}", userName);
    }

    return `${sparkleLine}
${confettiLine} ➤ *${type === 'welcome' ? 'WELCOME' : 'GOODBYE'}!* ${confettiLine}
👋 ${messageLine}
📌 Remember to follow the rules
🎈 Have fun & spread positivity!
👥 Members ${type === 'welcome' ? 'now' : 'left'}: ${memberCount}
${arrow} Enjoy! ⭐
${sparkleLine}`;
}

/**
 * Welcome handler
 */
async function handleWelcome(sock, chatId, message) {
    try {
        const userId = message.key?.participant || message.key?.remoteJid;
        const userName = `@${userId.split('@')[0]}`;

        const groupMeta = await sock.groupMetadata(chatId);
        const memberCount = groupMeta.participants.length;

        let profilePic = path.join(__dirname, '../assets/default-welcome.jpg');
        try {
            const pfpUrl = await sock.profilePictureUrl(userId, 'image');
            if(pfpUrl) profilePic = { url: pfpUrl };
        } catch{}

        const bannerText = generateBanner('welcome', userName, memberCount);

        await sock.sendMessage(chatId, {
            image: profilePic,
            caption: bannerText,
            mentions: [userId]
        });

    } catch(err) {
        console.error('Error in handleWelcome:', err);
    }
}

/**
 * Goodbye handler
 */
async function handleGoodbye(sock, chatId, message) {
    try {
        const userId = message.key?.participant || message.key?.remoteJid;
        const userName = `@${userId.split('@')[0]}`;

        const groupMeta = await sock.groupMetadata(chatId);
        const memberCount = groupMeta.participants.length - 1;

        let profilePic = path.join(__dirname, '../assets/default-goodbye.jpg');
        try {
            const pfpUrl = await sock.profilePictureUrl(userId, 'image');
            if(pfpUrl) profilePic = { url: pfpUrl };
        } catch{}

        const bannerText = generateBanner('goodbye', userName, memberCount);

        await sock.sendMessage(chatId, {
            image: profilePic,
            caption: bannerText,
            mentions: [userId]
        });

    } catch(err) {
        console.error('Error in handleGoodbye:', err);
    }
}

module.exports = { handleWelcome, handleGoodbye };
