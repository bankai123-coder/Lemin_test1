const config = require('../config');

module.exports = {
    name: 'menu',
    description: 'Display bot menu and commands',
    commands: ['menu', 'help', 'start'],
    enabled: true,

    async execute(sock, msg) {
        const chat = msg.key.remoteJid;
        
        const menuText = `
🤖 *${config.name.toUpperCase()}* 🤖

📋 *Available Commands:*

🎮 *Games:*
• ${config.prefix}tictactoe - Play TicTacToe
• ${config.prefix}quiz - Start a quiz

📥 *Downloads:*
• ${config.prefix}yt [url] - Download YouTube video
• ${config.prefix}tiktok [url] - Download TikTok video

🕌 *Islamic:*
• ${config.prefix}prayer - Prayer times
• ${config.prefix}adhan - Adhan settings

🤖 *AI Assistant:*
• ${config.prefix}ai [question] - Ask AI

ℹ️ *Info:*
• ${config.prefix}menu - Show this menu
• ${config.prefix}help - Show help

Bot Owner: ${config.ownerNumber}
Prefix: ${config.prefix}

Made with ❤️ by Sajin Bot Team
        `;

        await sock.sendMessage(chat, { text: menuText });
    }
};