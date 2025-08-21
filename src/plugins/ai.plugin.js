module.exports = {
    name: 'ai',
    description: 'AI assistant integration',
    commands: ['ai', 'ask'],
    enabled: true,

    async execute(sock, msg, args) {
        const chat = msg.key.remoteJid;
        const question = args.slice(1).join(' ');

        if (!question) {
            await sock.sendMessage(chat, { 
                text: '🤖 *AI Assistant*\n\nUsage: !ai [your question]\n\nExample: !ai What is the weather like today?'
            });
            return;
        }

        // Simple AI responses (you can integrate with OpenAI API later)
        const responses = [
            `🤖 That's an interesting question about "${question}". I'm still learning!`,
            `🤖 Regarding "${question}" - I'd need more context to give you a better answer.`,
            `🤖 You asked about "${question}". That's a great question! Let me think about it...`,
            `🤖 About "${question}" - I'm currently in development mode. Full AI features coming soon!`
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        await sock.sendMessage(chat, { 
            text: `${randomResponse}\n\n*Note: Full AI integration coming soon!*`
        });
    }
};