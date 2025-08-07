module.exports = {
    name: 'flirt',
    description: 'Flirts with the tagged user in a romantic, poetic, and deliciously flirty way 😘',
    category: 'fun',
    async run({ conn, m }) {
        try {
            const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            const taggedUser = mentioned ? `@${mentioned.split('@')[0]}` : null;

            if (!taggedUser) {
                return await conn.sendMessage(m.key.remoteJid, {
                    text: `🥵 Tag someone you want to flirt with passionately!\n\nExample: .flirt @username 💋`,
                    mentions: [m.sender],
                }, { quoted: m });
            }

            const flirtLines = [
                `👀 ${taggedUser}, you're not just hot... you're a full-blown fire my soul dances in. 🔥`,
                `💋 ${taggedUser}, if kisses were words, I'd write you a novel every night.`,
                `🍓 ${taggedUser}, your lips look like sin... and I’ve never wanted to sin more.`,
                `🥀 ${taggedUser}, you're my favorite daydream — and I hope you keep coming back.`,
                `🌹 ${taggedUser}, you don’t walk into a room… you seduce the air around you.`,
                `🫦 ${taggedUser}, the things I could whisper in your ear would make the stars blush.`,
                `💞 ${taggedUser}, I want to drown in your scent, get lost in your touch, and live in your smile.`,
                `🥂 ${taggedUser}, let’s toast to the tension between us — electric, sweet, and dangerous.`,
                `🛏️ ${taggedUser}, I won’t say what I’m thinking… but your name is tangled in it.`,
                `🔥 ${taggedUser}, being near you feels like standing in poetry — warm, slow-burning, and divine.`,
                `🌙 ${taggedUser}, let’s make the moon jealous of what we could become under its light.`,
                `👅 ${taggedUser}, say my name once... I’ll write yours on every breath.`,
                `🖤 ${taggedUser}, my fantasies wear your face — unapologetically, every night.`,
                `🧲 ${taggedUser}, I’m not flirting… I’m confessing a sweet little obsession.`,
                `💌 ${taggedUser}, I’d steal glances forever just to see you smile one more time.`,
                `📖 ${taggedUser}, you’re my favorite plot twist in this boring life story.`,
                `🫀 ${taggedUser}, I don’t want your heart. I want *every* heartbeat with me.`,
                `💫 ${taggedUser}, heaven must’ve cried when you were sent down — so the earth could fall in love.`,
                `👑 ${taggedUser}, you rule me — no crown needed, just that look in your eyes.`,
                `🧁 ${taggedUser}, you’re sweeter than anything I’ve ever tasted — and I’m hungry for more.`,
                `🌌 ${taggedUser}, you’re not the universe — you’re the gravity holding my chaos together.`,
                `🎼 ${taggedUser}, your voice is a song I want on repeat — with nothing but candlelight.`,
                `🌊 ${taggedUser}, every time you speak, waves crash inside me.`,
                `👄 ${taggedUser}, don’t say a word — just look at me the way you do… that’s enough to undo me.`,
                `🔒 ${taggedUser}, my thoughts are chained to you… willingly.`,
                `🫧 ${taggedUser}, even your silence seduces me.`,
                `🍷 ${taggedUser}, I’d sip you like wine — slowly, savoring every second.`,
                `⏳ ${taggedUser}, the night is long… and so are the things I’d whisper if you stayed close.`,
                `🫠 ${taggedUser}, you're not a crush — you're a slow-burning wildfire I never want to put out.`,
                `💭 ${taggedUser}, I flirt with your memory more than I sleep.`,
            ];

            const flirtText = flirtLines[Math.floor(Math.random() * flirtLines.length)];

            await conn.sendMessage(m.key.remoteJid, {
                text: flirtText,
                mentions: [mentioned],
            }, { quoted: m });

        } catch (err) {
            console.error('Flirt command error:', err);
            await conn.sendMessage(m.key.remoteJid, {
                text: '❌ Something went wrong while flirting. Even hearts glitch sometimes 💔',
            }, { quoted: m });
        }
    }
};
