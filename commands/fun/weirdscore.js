module.exports = {
  name: "weirdscore",
  category: "fun",
  async run({ conn, m }) {
    const target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    const tag = target.split('@')[0];
    const lines = [
      `@${tag}, 99% sus 💀`,
      `@${tag}, your crush is watching 👀`,
      `@${tag}, stay away from kids 🚫`
    ];
    const msg = lines[Math.floor(Math.random() * lines.length)];
    await conn.sendMessage(m.chat, { text: `🎉 *WEIRDSCORE COMMAND*

${msg}`, mentions: [target] }, { quoted: m });
  }
};