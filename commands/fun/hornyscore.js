module.exports = {
  name: "hornyscore",
  category: "fun",
  async run({ conn, m }) {
    const target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    const tag = target.split('@')[0];
    const lines = [
      `@${tag}, banned in 17 galaxies 🚀`,
      `@${tag}, you are being hacked 💻`,
      `@${tag}, danger level: 10,000% 🔥`
    ];
    const msg = lines[Math.floor(Math.random() * lines.length)];
    await conn.sendMessage(m.chat, { text: `🎉 *HORNYSCORE COMMAND*

${msg}`, mentions: [target] }, { quoted: m });
  }
};