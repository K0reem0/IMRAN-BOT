const fs = require("fs");
const path = require("path");
const _fs = fs.promises;

async function pasteCommand(sock, chatId, m) {
    try {
        const isOwner = m.key.fromMe;
        if (!isOwner) {
            return await sock.sendMessage(chatId, { text: '❌ *Only the bot owner can use this command!*' });
        }

        const body = m.message?.conversation 
                  || m.message?.extendedTextMessage?.text 
                  || "";
        const text = body.replace(/^\.paste\s*/i, ""); // يشيل كلمة .paste من النص

        if (!text) {
            return sock.sendMessage(chatId, { text: '✳️ Usage: .paste <fileName> + new code' });
        }

        const parts = text.split("\n");
        const filename = parts[0]?.trim();
        const newCode = parts.slice(1).join("\n").trim();

        if (!filename || !newCode) {
            return sock.sendMessage(chatId, { text: "⚠️ Please provide both a file name and new code content." });
        }

        if (filename.includes("..") || filename.startsWith("/")) {
            return sock.sendMessage(chatId, { text: "❎ Invalid file name. Avoid using '..' or absolute paths." });
        }

        const pathFile = path.join(__dirname, filename);
        if (!fs.existsSync(pathFile)) {
            await sock.sendMessage(chatId, { text: `⚠️ The file *${filename}* does not exist. It will be created.` });
        }

        await _fs.writeFile(pathFile, newCode, "utf8");
        await sock.sendMessage(chatId, { text: `✅ The file *${filename}* has been updated successfully.` });

    } catch (err) {
        console.error(err);
        await sock.sendMessage(chatId, { text: `❎ Error: ${err.message}` });
    }
}

module.exports = pasteCommand;
