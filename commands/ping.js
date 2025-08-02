const os = require('os');
const settings = require('../settings.js');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function pingCommand(sock, chatId, message) {
    try {
        const start = Date.now();
        await sock.sendMessage(chatId, { text: '🛰️ *Connecting to IMRAN BOT servers...*\n_Please wait..._' }, { quoted: message });
        const end = Date.now();
        const ping = Math.round((end - start) / 2);
        const uptime = formatTime(process.uptime());
        const platform = os.platform();
        const cpu = os.cpus()[0].model;
        const totalMem = Math.round(os.totalmem() / 1024 / 1024);
        const freeMem = Math.round(os.freemem() / 1024 / 1024);

        const fancyPing = `
╭━━━[ 🤖 *IMRAN BOT STATUS* 🤖 ]━━━╮
┃⏱️ *Ping:* ${ping} ms
┃🕒 *Uptime:* ${uptime}
┃💻 *Platform:* ${platform}
┃🧠 *CPU:* ${cpu}
┃📦 *RAM:* ${freeMem}MB / ${totalMem}MB
┃🌍 *Time:* ${new Date().toLocaleString()}
┃🔧 *Version:* ${settings.version}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

💡 _“Speed is my middle name!” – IMRAN BOT_
🔥 Type *.menu* to see the magic!`;

        await sock.sendMessage(chatId, { text: fancyPing }, { quoted: message });
    } catch (error) {
        console.error('❌ Ping command error:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to fetch bot status. Try again later!' });
    }
}

module.exports = pingCommand;
