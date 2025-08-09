module.exports = {
    name: "find",
    alias: ["match", "ship"],
    description: "Finds a random partner for someone in the group with extra spice 💘",
    category: "fun",
    async run({ conn, m, args }) {
        const groupMetadata = await conn.groupMetadata(m.chat);
        const participants = groupMetadata.participants.map(p => p.id);

        const target = m.mentionedJid[0] || m.sender;
        const tagTarget = `@${target.split("@")[0]}`;

        // Exclude target + bot from selection
        const filtered = participants.filter(p => p !== target && p !== conn.user.id);
        if (!filtered.length) {
            return conn.sendMessage(m.chat, { text: "😅 No one else here to match with!" }, { quoted: m });
        }

        const randomPartner = filtered[Math.floor(Math.random() * filtered.length)];
        const tagPartner = `@${randomPartner.split("@")[0]}`;

        const funnyOpeners = [
            `💘 Breaking News: ${tagTarget} is now officially taken by ${tagPartner}!`,
            `😂 ${tagTarget} just found true love… and it’s ${tagPartner}!`,
            `💞 Match made in heaven: ${tagTarget} ❤️ ${tagPartner}`,
            `😏 ${tagTarget} slid into ${tagPartner}’s DMs and never came back.`,
            `🔥 ${tagTarget} and ${tagPartner} are now *Group’s Hottest Couple*!`
        ];

        const randomLine = funnyOpeners[Math.floor(Math.random() * funnyOpeners.length)];

        // Send funny result
        await conn.sendMessage(
            m.chat,
            { text: `${randomLine}`, mentions: [target, randomPartner] },
            { quoted: m }
        );

        // Optional: group "shipping" poll
        await conn.sendMessage(m.chat, {
            poll: {
                name: `Do you ship ${tagTarget} ❤️ ${tagPartner}?`,
                values: ["💘 YES", "😂 NO", "😏 Secretly Dating Already"],
                multiselect: false
            }
        });
    },
};
