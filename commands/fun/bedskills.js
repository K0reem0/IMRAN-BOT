module.exports = {
  name: "bedskills",
  category: "fun",
  async run({ conn, m }) {
    const target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    const tag = target.split('@')[0];
    const lines = [
      `@${tag}, 99% sus 💀`,
      `@${tag}, the FBI wants to know your location 🚨`,
      `@${tag}, danger level: 10,000% 🔥`
    ];
    const msg = lines[Math.floor(Math.random() * lines.length)];
    await conn.sendMessage(m.chat, { text: `🎉 *BEDSKILLS COMMAND*

${msg}`, mentions: [target] }, { quoted: m });
  }
};