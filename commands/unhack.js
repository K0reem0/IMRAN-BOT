// File: commands/unhack.js

module.exports = {
  name: "unhack",
  alias: ["unhack", "restore", "antihack"],
  description: "Simulate restoring the system after a prank hack",
  category: "fun",
  async run({ conn, m, args }) {
    const target = args.join(" ") || "Target Device";
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const steps = [
      `🛠 [UNHACK MODULE] Initializing recovery mode...`,
      `🔍 Scanning for infected files in ${target}...`,
      `💉 Neutralizing injected worms...`,
      `🚿 Cleaning system registry...`,
      `🔧 Restoring deleted files: system32.dll, TikTok.db, heart.exe`,
      `🔐 Rebuilding firewall with anti-ImranBot protection`,
      `💾 Reinstalling antivirus: *ClownDefender 2077*`,
      `🔌 Reconnecting to clean network...`,
      `📡 Disconnecting from ImranBot surveillance`,
      `✅ Unhack successful! 🎉`,
      `📢 But be warned...`,
      `😈 ImranBot never truly leaves... 👀`
    ];

    await conn.sendMessage(m.chat, {
      text: `🧹 Beginning *UNHACK* operation on *${target}*\n🔄 Please remain calm while we undo the chaos...`,
    }, { quoted: m });

    for (let i = 0; i < steps.length; i++) {
      await delay(2500);
      await conn.sendMessage(m.chat, { text: steps[i] }, { quoted: m });
    }

    await delay(2000);
    await conn.sendMessage(m.chat, {
      text: `🎭 System restored... Or is it?\n\n😜 This was a prank by *IMRAN BOT*. You’re safe (for now).\n💡 Try hacking again with *.imranhack*`,
    }, { quoted: m });
  }
};
