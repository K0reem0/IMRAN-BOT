let handler = async (m, { text, args, usedPrefix, command }) => {
  const target = m.mentionedJid[0] || m.quoted?.sender || m.sender;
  const name = await conn.getName(target);

  const flirtLines = `
🌹 Hey ${name}, did it hurt when you fell... from heaven? 😏

💌 Your name must be Google, because you have everything I’ve been searching for. 🥰

✨ Every moment without you feels like a year. Be mine, now and forever? ❤️

🌙 Are you the moon? Because even when you’re far, you still light up my nights. 🌌

🔥 Can I follow you home? Because my heart just found its destination. 🏡

🍫 You’re sweeter than all the chocolate in the world. And trust me, I’ve tasted them all. 😉

💖 My heart speaks your name every time it beats. Want to hear it? Come closer. 😚

⏳ Let’s stop wasting time. Just admit we’re meant to be. 💑

🎶 If love was a song, I’d play you on repeat forever. 🎧

🦋 Butterflies? Nah, you give me fireworks. 💥

🫶 I wasn’t planning to fall this hard, but you made gravity stronger. 💘

👀 Even when I try not to look, you still own my gaze. Damn. 🔥

📱 Your message notification is the only one that makes my heart race. 📲❤️

🍃 With every breath, I wish you were beside me.

💬 I’m not texting anyone else. You’ve already stolen all my attention.

🌷 Roses are red, violets are blue… I’m not a poet, I just fell for you.

💭 If thinking of you was a job, I’d be a billionaire. 💸

🤫 I keep my feelings lowkey… except when I look at you. Then it’s obvious.

🌡️ You raise the temperature every time you enter the chat. 🥵

🪞 You’re not just beautiful. You’re art. I could admire you forever.

💤 Even in my dreams, it’s you. Always you.

🥂 Let's skip the small talk and go straight to planning our forever?

🫶 You + Me = Story worth telling.

🖤 The way you smile? Deadly. The way you talk? Addictive.

🚨 Someone call the cops – you just stole my heart in broad daylight!

👑 You're not my type. You're my standard. 💯

🥺 I want to be the reason behind your late-night smiles and butterflies.

📍Can I save you as “Home”? Because that’s what you feel like.

📸 Even without filters, you’re stunning.

🪐 You’re my favorite notification in this entire galaxy.

🤍 If love was a crime, I’d confess just to be with you.

🎇 Baby, you don't need to flirt back. Just let me adore you.

💫 Don’t worry, I’m not here to impress you. I’m here to love you endlessly.
`;

  m.reply(flirtLines.trim());
};

handler.help = ['flirt'];
handler.tags = ['fun'];
handler.command = ['flirt'];
export default handler;
