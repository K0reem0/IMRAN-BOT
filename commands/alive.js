module.exports = {
  name: 'alive',
  alias: ['bot'],
  category: 'general',
  desc: 'Check if bot is alive',
  async run({ sock, m }) {
    function formatUptime(seconds) {
      seconds = Number(seconds);
      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor((seconds % (3600 * 24)) / 3600);
      const min = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      const parts = [];
      if (d) parts.push(`${d}d`);
      if (h) parts.push(`${h}h`);
      if (min) parts.push(`${min}m`);
      parts.push(`${s}s`);
      return parts.join(' ');
    }

    const uptime = formatUptime(process.uptime());

    const banner = `
╭━━━〔 🤖 IMRAN BOT 〕━━━╮
┃  ✅ Alive & Running Strong!
┃
┃  ⏳ Uptime: ${uptime}
┃  💻 Status: Online
╰━━━━━━━━━━━━━━━━━━━━━━━╯
    `.trim();

    await sock.sendMessage(m.chat, { text: banner }, { quoted: m });
  }
};
