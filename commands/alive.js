module.exports = {
  name: "alive",
  alias: ["ping", "bot"],
  description: "Check if IMRAN BOT is alive",
  category: "core",
  async run({ conn, m }) {
    const audioPath = './assets/alive.mp3';

    const caption = `🤖 *IMRAN BOT is Active!*
🔗 Hidden Channel: https://whatsapp.com/channel/0029VbAoVt0Bqbr1vsgafC3r`;

    await conn.sendMessage(m.chat, {
      audio: { url: audioPath },
      mimetype: 'audio/mp4',
      ptt: true,
      caption
    }, { quoted: m });
  }
};
