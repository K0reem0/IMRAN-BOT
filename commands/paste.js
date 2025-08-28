const fs = require("fs");
const path = require("path");
const _fs = fs.promises;

module.exports = {
    name: "paste",
    alias: ["p"],
    description: "Create or update a file with new code content",
    category: "owner",
    async run({ conn, m, args, usedPrefix, command, __dirname }) {
        try {
            if (!args.length) {
                return conn.sendMessage(m.chat, {
                    text: `
✳️ Usage: ${usedPrefix + command} <fileName>
<new code here...>

📌 Example:
${usedPrefix}paste main.js
// New code content...
`.trim()
                }, { quoted: m });
            }

            // Split and sanitize input
            const text = args.join(" ").trim();
            const parts = text.split("\n");
            const filename = parts[0]?.trim();
            const newCode = parts.slice(1).join("\n").trim();

            if (!filename || !newCode) {
                return conn.sendMessage(m.chat, { text: "⚠️ Please provide both a file name and new code content." }, { quoted: m });
            }

            if (filename.includes("..") || filename.startsWith("/")) {
                return conn.sendMessage(m.chat, { text: "❎ Invalid file name. Avoid using '..' or absolute paths." }, { quoted: m });
            }

            const pathFile = path.join(__dirname, filename);

            // Check if file exists
            if (!fs.existsSync(pathFile)) {
                await conn.sendMessage(m.chat, { text: `⚠️ The file *${filename}* does not exist. It will be created.` }, { quoted: m });
            }

            // Write file
            await _fs.writeFile(pathFile, newCode, "utf8");

            await conn.sendMessage(m.chat, { text: `✅ The file *${filename}* has been updated successfully.` }, { quoted: m });

        } catch (err) {
            console.error(err);
            await conn.sendMessage(m.chat, { text: `❎ Error: ${err.message}` }, { quoted: m });
        }
    }
};
