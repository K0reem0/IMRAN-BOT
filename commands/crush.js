module.exports = {
  name: "crush",
  description: "Funny command from IMRAN BOT",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const messages = ['Calculating your secret crush from WhatsApp chat patterns...', '✅ Done! It’s... Bakhtawar Aunty’s Daughter 💘'];
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
