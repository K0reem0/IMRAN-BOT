const path = require('path');
const fs = require('fs');

module.exports = {
  name: "alive",
  alias: ["ping", "bot", "online"],
  description: "Check if IMRAN BOT is alive",
  category: "core",
  
  async run({ conn, m }) {
    const audioPath = path.join(__dirname, '../assets/alive.mp3');

    const caption = `╔═══════════════════════╗
    🤖 *IMRAN BOT STATUS*
╚═══════════════════════╝

🟢 *Bot is Active & Running!*
👑 *Owner:* Imran Hacks
📍 *Location:* Shangla, Pakistan
🌐 *Channel:* 
https://whatsapp.com/channel/0029VbAoVt0Bqbr1vsgafC3r

💬 Use *.menu* to see all commands.
⚡ Stay tuned for more fun & powerful features!

_Thank you for using IMRAN BOT!_`;

    // Send text caption first
    await conn.sendMessage(m.chat, {
      text: caption
    }, { quoted: m });

    // Then send voice note
    if (fs.existsSync(audioPath)) {
      await conn.sendMessage(m.chat, {
        audio: { url: audioPath },
        mimetype: 'audio/mp4',
        ptt: true
      }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, {
        text: '⚠️ Alive audio file not found!'
      }, { quoted: m });
    }
  }
};
