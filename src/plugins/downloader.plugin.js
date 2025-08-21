module.exports = {
    name: 'downloader',
    description: 'Download videos from various platforms',
    commands: ['yt', 'youtube', 'tiktok'],
    enabled: true,

    async execute(sock, msg, args) {
        const command = args[0] || msg.message?.conversation?.slice(1).split(' ')[0];
        const chat = msg.key.remoteJid;

        switch (command) {
            case 'yt':
            case 'youtube':
                if (!args[1]) {
                    await sock.sendMessage(chat, { 
                        text: '📥 *YouTube Downloader*\n\nUsage: !yt [YouTube URL]\n\nExample: !yt https://youtube.com/watch?v=...'
                    });
                    return;
                }
                
                await sock.sendMessage(chat, { 
                    text: `📥 *YouTube Download*\n\nURL: ${args[1]}\n\n⏳ Processing... (Feature under development)`
                });
                break;

            case 'tiktok':
                if (!args[1]) {
                    await sock.sendMessage(chat, { 
                        text: '📥 *TikTok Downloader*\n\nUsage: !tiktok [TikTok URL]\n\nExample: !tiktok https://tiktok.com/@user/video/...'
                    });
                    return;
                }
                
                await sock.sendMessage(chat, { 
                    text: `📥 *TikTok Download*\n\nURL: ${args[1]}\n\n⏳ Processing... (Feature under development)`
                });
                break;
        }
    }
};