const ytdl = require('ytdl-core');
const { createButtonMessage, createButton } = require('../../utils/buttons');

module.exports = {
    name: 'youtube',
    description: 'Download YouTube videos',
    commands: ['yt', 'youtube'],
    enabled: true,

    async execute(sock, msg, args) {
        const chat = msg.key.remoteJid;
        
        if (!args[0]) {
            const buttons = [
                createButton('Video', 'yt_video'),
                createButton('Audio', 'yt_audio')
            ];

            await sock.sendMessage(chat, createButtonMessage(
                '📥 YouTube Downloader\nSend a YouTube link after selecting format:',
                buttons,
                'Choose download format'
            ));
            return;
        }

        const url = args[0];
        if (!ytdl.validateURL(url)) {
            await sock.sendMessage(chat, { text: '❌ Please provide a valid YouTube URL' });
            return;
        }

        try {
            const info = await ytdl.getInfo(url);
            await sock.sendMessage(chat, { text: `⏳ Downloading: ${info.videoDetails.title}` });
            // Download logic here
        } catch (error) {
            await sock.sendMessage(chat, { text: '❌ Failed to download video' });
        }
    }
};