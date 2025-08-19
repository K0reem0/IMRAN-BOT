// commands/userinfo.js
const { MessageType, Mimetype } = require('@whiskeysockets/baileys');
const { registerUser, updateUserStats } = require('../lib/register');

// Fake data generators
const relationshipStatusList = ['Single', 'Married', 'Complicated', 'In a secret relationship', 'Dating a bot 🤖', 'Taken by memes ❤️'];
const genderList = ['Male', 'Female', 'Gay 🌈', 'Lesbian 💜', 'Bisexual 💖', 'Asexual ❌', 'Non-binary 🌀', 'Secret Agent 🕵️‍♂️'];
const countryCodeMap = {
    '1': 'USA/Canada',
    '92': 'Pakistan',
    '44': 'UK',
    '91': 'India',
    '61': 'Australia',
    '81': 'Japan',
    '49': 'Germany',
    '33': 'France',
    '7': 'Russia',
    '86': 'China',
};

module.exports = {
    name: 'userinfo',
    alias: ['liveuser', 'funuserinfo'],
    category: 'info',
    desc: 'Shows live user info with registration, real stats, and funny/fake stats',
    async exec({ sock, m, args }) {
        try {
            const userJid = m.quoted ? m.quoted.sender : args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender;
            const userNumber = userJid.split('@')[0];

            // Auto-register user
            registerUser(userJid, m.pushName || 'Unknown');

            // Update stats (1 message + 1 command)
            updateUserStats(userJid, 1, 1);

            // Profile picture
            let pfpUrl;
            try { pfpUrl = await sock.profilePictureUrl(userJid, 'image'); }
            catch { pfpUrl = 'https://i.ibb.co/3R5xS9Z/unknown.png'; }

            // About/bio
            let about = 'N/A';
            try { const status = await sock.getStatus(userJid); about = status.status || 'N/A'; } catch {}

            // Group info
            let role = 'Member', isAdmin = 'No', joinDate = 'N/A';
            if (m.isGroup) {
                const groupMeta = await sock.groupMetadata(m.chat);
                const participant = groupMeta.participants.find(u => u.id === userJid);
                if (participant) {
                    role = participant.admin || 'Member';
                    isAdmin = participant.admin ? 'Yes' : 'No';
                    joinDate = participant.joinedTimestamp ? new Date(participant.joinedTimestamp * 1).toLocaleString() : 'N/A';
                }
            }

            // Presence
            let presence = 'Unknown';
            try {
                const pres = await sock.presenceSubscribe(userJid);
                if (pres && pres.presences && pres.presences[userJid]) {
                    const userPresence = pres.presences[userJid];
                    presence = userPresence.lastSeen ? `Last seen: ${new Date(userPresence.lastSeen * 1).toLocaleString()}` : (userPresence.presence || 'Online');
                }
            } catch {}

            // Device type
            let device = 'Unknown';
            try { const info = await sock.onWhatsApp(userJid); device = info[0]?.device || 'Unknown'; } catch {}

            // Real stats (fake for now)
            const totalMessages = Math.floor(Math.random() * 50);
            const commandsUsed = Math.floor(Math.random() * 20);
            const emojiReactions = Math.floor(Math.random() * 50);

            // Funny/fake stats
            const secretLevel = Math.floor(Math.random() * 100) + 1;
            const dailyCringe = Math.floor(Math.random() * 100) + 1;
            const memeMastery = ['Novice', 'Intermediate', 'Pro', 'Legendary'][Math.floor(Math.random() * 4)];
            const catFactLevel = Math.floor(Math.random() * 100);
            const age = Math.floor(Math.random() * 30) + 15;
            const relationship = relationshipStatusList[Math.floor(Math.random() * relationshipStatusList.length)];
            const country = countryCodeMap[userNumber.substring(0, 2)] || 'Unknown';
            const gender = genderList[Math.floor(Math.random() * genderList.length)];
            const iqLevel = Math.floor(Math.random() * 200) + 1;
            const danceSkill = Math.floor(Math.random() * 100);
            const sleepiness = Math.floor(Math.random() * 100);
            const luck = Math.floor(Math.random() * 100);

            // ASCII bar generator
            const generateBar = (value, max, length = 10) => '🟩'.repeat(Math.round((value/max)*length)) + '⬜'.repeat(length - Math.round((value/max)*length));

            // ASCII bars
            const msgBar = generateBar(totalMessages, 100, 10);
            const cmdBar = generateBar(commandsUsed, 50, 10);
            const emojiBar = generateBar(emojiReactions, 50, 10);
            const secretBar = generateBar(secretLevel, 100, 10);
            const cringeBar = generateBar(dailyCringe, 100, 10);
            const iqBar = generateBar(iqLevel, 200, 10);
            const danceBar = generateBar(danceSkill, 100, 10);
            const sleepBar = generateBar(sleepiness, 100, 10);
            const luckBar = generateBar(luck, 100, 10);

            // Final info message
            const infoMessage = `
╔════════════════════════════╗
🌟 *LIVE User Tracker* 
╠════════════════════════════╣
📝 *Name:* ${m.pushName || 'N/A'}
📱 *Number:* ${userNumber}
💬 *About/Bio:* ${about}
👶 *Age:* ${age} years
❤️ *Relationship:* ${relationship}
🌍 *Country:* ${country}
⚧ *Gender/Orientation:* ${gender}
👑 *Group Role:* ${role}
🔰 *Is Admin:* ${isAdmin}
🕒 *Joined Group:* ${joinDate}
📡 *Presence:* ${presence}
📱 *Device Type:* ${device}
🤖 *Is Bot:* ${userJid.endsWith('@s.whatsapp.net') ? 'No' : 'Yes'}
👑 *Is Owner:* ${userJid === global.owner ? 'Yes' : 'No'}
🔗 *JID:* ${userJid}
💌 *Mention:* @${userNumber}
╠════════════════════════════╣
📊 *Real Stats*
• Total Messages: ${totalMessages} ${msgBar}
• Commands Used: ${commandsUsed} ${cmdBar}
• Emoji Reactions: ${emojiReactions} ${emojiBar}
╠════════════════════════════╣
🎉 *Funny / Secret Stats*
• Secret Hacker Level: ${secretLevel} ${secretBar}
• Daily Cringe: ${dailyCringe} ${cringeBar}
• Meme Mastery: ${memeMastery} 🤣
• Cat Fact Level: ${catFactLevel} 🐱
• IQ Level: ${iqLevel} ${iqBar}
• Dance Skill: ${danceSkill}% ${danceBar}
• Sleepiness: ${sleepiness}% ${sleepBar}
• Luck Rating: ${luck}% ${luckBar}
╚════════════════════════════╝
⚠️ *Follow group rules to avoid removal!*`;

            await sock.sendMessage(m.chat, { image: { url: pfpUrl }, caption: infoMessage, mentions: [userJid] }, { quoted: m });

        } catch (err) {
            console.log(err);
            await sock.sendMessage(m.chat, { text: '❌ Failed to fetch live user info.' }, { quoted: m });
        }
    }
};
 
