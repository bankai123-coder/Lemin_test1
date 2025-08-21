const config = require('../config');

module.exports = {
    name: 'basic',
    description: 'Basic bot commands',
    commands: ['ping', 'info', 'owner'],
    enabled: true,

    async execute(sock, msg, args) {
        const chat = msg.key.remoteJid;
        const command = args[0] || msg.message?.conversation?.slice(1).split(' ')[0];

        switch (command) {
            case 'ping':
                const start = Date.now();
                const sent = await sock.sendMessage(chat, { text: '🏓 Pinging...' });
                const end = Date.now();
                
                await sock.sendMessage(chat, { 
                    text: `🏓 Pong!\nLatency: ${end - start}ms`,
                    edit: sent.key
                });
                break;

            case 'info':
                await sock.sendMessage(chat, { 
                    text: `ℹ️ *Bot Information*\n\nName: ${config.name}\nBot Number: ${config.botNumber}\nOwner: ${config.ownerNumber}\nPrefix: ${config.prefix}\n\nStatus: ✅ Online`
                });
                break;

            case 'owner':
                await sock.sendMessage(chat, { 
                    text: `👤 *Bot Owner*\n\nOwner Number: ${config.ownerNumber}\nContact: wa.me/${config.ownerNumber}`
                });
                break;
        }
    }
};