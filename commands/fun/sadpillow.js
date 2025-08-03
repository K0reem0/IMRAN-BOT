module.exports = {
  name: "sadpillow",
  category: "fun",
  async run({ conn, m }) {
    const target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    const tag = target.split('@')[0];
    const lines = [
      `@${tag}, loved by aliens 👽`,
      `@${tag}, your crush is watching 👀`,
      `@${tag}, danger level: 10,000% 🔥`
    ];
    const msg = lines[Math.floor(Math.random() * lines.length)];
    await conn.sendMessage(m.chat, { text: `🎉 *SADPILLOW COMMAND*

${msg}`, mentions: [target] }, { quoted: m });
  }
};