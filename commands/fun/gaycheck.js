module.exports = {
  name: "gaycheck",
  category: "fun",
  async run({ conn, m }) {
    const target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    const tag = target.split('@')[0];
    const lines = [
      `@${tag}, loved by aliens 👽`,
      `@${tag}, you are being hacked 💻`,
      `@${tag}, approved by Bhootan Laal 👻`
    ];
    const msg = lines[Math.floor(Math.random() * lines.length)];
    await conn.sendMessage(m.chat, { text: `🎉 *GAYCHECK COMMAND*

${msg}`, mentions: [target] }, { quoted: m });
  }
};