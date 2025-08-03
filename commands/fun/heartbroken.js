module.exports = {
  name: "heartbroken",
  category: "fun",
  async run({ conn, m }) {
    const target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    const tag = target.split('@')[0];
    const lines = [
      `@${tag}, you are 0% weird 🐥`,
      `@${tag}, the FBI wants to know your location 🚨`,
      `@${tag}, stay away from kids 🚫`
    ];
    const msg = lines[Math.floor(Math.random() * lines.length)];
    await conn.sendMessage(m.chat, { text: `🎉 *HEARTBROKEN COMMAND*

${msg}`, mentions: [target] }, { quoted: m });
  }
};