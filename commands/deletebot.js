const { sleep } = require('../lib/myfunc');

module.exports = {
  name: 'deletebot',
  description: 'Pretend to delete the bot with dramatic effect',
  category: 'fun',
  async execute(m, { sock }) {
    let msg = `⚠️ *DELETING IMRAN-BOT...*\n\n⏳ Please wait while the system wipes all data...`;
    await sock.sendMessage(m.chat, { text: msg }, { quoted: m });

    await sleep(3000);
    await sock.sendMessage(m.chat, { text: `🚨 Warning: Unauthorized Access Detected!` }, { quoted: m });

    await sleep(2000);
    await sock.sendMessage(m.chat, { text: `💣 Initiating Self-Destruction Protocol in 3...` }, { quoted: m });
    await sleep(1000);
    await sock.sendMessage(m.chat, { text: `2...` }, { quoted: m });
    await sleep(1000);
    await sock.sendMessage(m.chat, { text: `1...` }, { quoted: m });
    await sleep(1000);

    await sock.sendMessage(m.chat, { text: `☠️ *IMRAN-BOT has been deleted from this group.*` });

    // Fake leave message
    await sleep(1500);
    await sock.sendMessage(m.chat, { text: `👋 IMRAN-BOT left the group.` });

    // Dramatic rejoin
    await sleep(4000);
    await sock.sendMessage(m.chat, { text: `🚪 Rejoining group...` });
    await sleep(2000);
    await sock.sendMessage(m.chat, {
      text: `😈 *IMRAN-BOT is back!* \n\nYou thought I was gone? I'm unstoppable! 🔥`,
    });
  }
};
