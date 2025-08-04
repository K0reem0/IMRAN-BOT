const path = require('path');

module.exports = async function aliveCommand(sock, chatId, message) {
  const audioPath = path.join(__dirname, '../assets/alive.mp3');

  const caption = `🤖 *IMRAN BOT is Active!*
🔗 Hidden Channel: https://whatsapp.com/channel/0029VbAoVt0Bqbr1vsgafC3r`;

  await sock.sendMessage(chatId, {
    audio: { url: audioPath },
    mimetype: 'audio/mp4',
    ptt: true,
    caption
  }, { quoted: message });
};
