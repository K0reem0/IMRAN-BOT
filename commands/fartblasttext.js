const delay = (ms) => new Promise(res => setTimeout(res, ms));

module.exports = {
  name: "fartblasttext",
  alias: ["fartanim", "gasbomb", "fartline"],
  description: "Weird animated fart roast for the tagged user",
  category: "fun",
  async run({ conn, m }) {
    const mentionedJid = m.mentionedJid?.[0] || m.quoted?.participant;
    if (!mentionedJid) {
      return conn.sendMessage(m.chat, {
        text: "💨 Tag or reply to someone to drop a fart bomb on them!",
      }, { quoted: m });
    }

    const tag = "@" + mentionedJid.split("@")[0];

    const animation = [
      "😐",
      "😐💨",
      "😐💨💨",
      "😐💨💨💨",
      "😐💨💨💨💨",
      "🤔 *What's that smell...?*",
      "😵‍💫 *Oh no... it's happening...*",
      "💣💨💥 *EXPLOSIVE FART DETONATED!*",
      "🥵💀 Oxygen levels dropping...",
      "🧼 *Deploying emergency sanitizer...*",
    ];

    const finalRoasts = [
      `💩 ${tag} farted so hard, Google Maps rerouted people around them.`,
      `🧠 ${tag}'s fart unlocked ancient memories in everyone’s DNA.`,
      `☢️ ${tag}'s fart made the Avengers retire.`,
      `🧻 ${tag}'s fart echo triggered car alarms in 3 cities.`,
      `💀 ${tag}'s butt just committed an unspeakable war crime.`,
      `🦠 Scientists are now studying ${tag}'s fart as a new virus strain.`,
      `💃 Even ghosts left the house after ${tag} farted.`,
      `🕳️ A black hole opened from ${tag}'s rear end.`,
      `🔥 NASA mistook ${tag}'s fart for an asteroid strike.`,
      `🌋 ${tag}'s fart caused a volcano to apologize.`,
      `🍔 ${tag}'s fart melted cheese from 2km away.`,
      `📴 Everyone’s WiFi disconnected after ${tag}'s fart shockwave.`,
      `🎺 ${tag} invented a new musical instrument using their butt.`,
      `🐛 Bugs in the area evolved gas masks thanks to ${tag}.`,
      `🔊 ${tag}'s fart got copyright claimed for being too unique.`,
      `🧼 Air fresheners gave up and resigned.`,
      `🎬 Netflix is making a documentary on ${tag}'s fart.`,
      `🌐 The entire internet slowed down for 3 seconds due to ${tag}'s gas.`,
    ];

    // Run animation
    for (let line of animation) {
      await conn.sendMessage(m.chat, {
        text: line,
        mentions: [mentionedJid],
      }, { quoted: m });
      await delay(700);
    }

    // Send final insane roast
    const roast = finalRoasts[Math.floor(Math.random() * finalRoasts.length)];
    await conn.sendMessage(m.chat, {
      text: roast,
      mentions: [mentionedJid],
    }, { quoted: m });
  }
};
