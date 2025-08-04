module.exports = {
  name: "lovecheck",
  alias: ["lovemeter", "lovetest"],
  description: "Check love percentage between two people 💘",
  category: "fun",
  async run({ conn, m, args }) {
    const tagged = m.mentionedJid[0];
    const sender = m.sender;

    if (!tagged) return m.reply("💔 Tag someone to check your love %");

    const percent = Math.floor(Math.random() * 101);
    const hearts = "❤️".repeat(Math.floor(percent / 10));

    await conn.sendMessage(m.chat, {
      text: `💘 *LOVE METER* 💘\n\n@${sender.split('@')[0]} ❤️ @${tagged.split('@')[0]}\n💖 Love: *${percent}%*\n${hearts}`,
      mentions: [sender, tagged]
    });
  }
};
