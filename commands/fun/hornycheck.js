module.exports = {
  name: "hornycheck",
  category: "fun",
  async run({ conn, m }) {
    const target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    const tag = target.split('@')[0];
    const lines = [
      `@${tag}, banned in 17 galaxies 🚀`,
      `@${tag}, your crush is watching 👀`,
      `@${tag}, approved by Bhootan Laal 👻`
    ];
    const msg = lines[Math.floor(Math.random() * lines.length)];
    await conn.sendMessage(m.chat, { text: `🎉 *HORNYCHECK COMMAND*

${msg}`, mentions: [target] }, { quoted: m });
  }
};