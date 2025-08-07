const { sendMessage } = require('@whiskeysockets/baileys');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  name: 'deletebot',
  alias: ['.deletebot'],
  category: 'fun',
  description: 'Fake bot self-destruction and rejoin prank',
  async run(m, { sock }) {
    const groupName = m.pushName || 'this group';
    const fakeLeaveMsg = `
⚠️ IMRAN-BOT is being deleted from ${groupName}...

Deleting core files...
Erasing memory...
Shutting down commands...
  
💥 BOT HAS BEEN REMOVED FROM GROUP 💥

Goodbye forever...
    `;

    await sock.sendMessage(m.chat, { text: fakeLeaveMsg }, { quoted: m });
    await sleep(5000);

    const fakeJoinMsg = `
🔄 SYSTEM OVERRIDE DETECTED
🔁 Auto-Rejoining ${groupName}...

🔒 SECURITY PATCHED
✅ IMRAN-BOT IS BACK ONLINE!

👁️ Someone tried to delete me... I don’t die that easy.
`;

    await sock.sendMessage(m.chat, { text: fakeJoinMsg }, { quoted: m });
  }
};
