module.exports = {
    name: 'games',
    description: 'Interactive games for the bot',
    commands: ['tictactoe', 'quiz'],
    enabled: true,

    async execute(sock, msg, args) {
        const command = args[0] || msg.message?.conversation?.slice(1).split(' ')[0];
        const chat = msg.key.remoteJid;

        switch (command) {
            case 'tictactoe':
                await sock.sendMessage(chat, { 
                    text: `🎮 *TicTacToe Game*\n\nGame starting soon...\nThis feature is under development!`
                });
                break;

            case 'quiz':
                const questions = [
                    { q: "What is the capital of France?", a: "Paris" },
                    { q: "What is 2 + 2?", a: "4" },
                    { q: "What color is the sky?", a: "Blue" }
                ];
                
                const randomQ = questions[Math.floor(Math.random() * questions.length)];
                await sock.sendMessage(chat, { 
                    text: `🧠 *Quiz Time!*\n\nQuestion: ${randomQ.q}\n\nReply with your answer!`
                });
                break;
        }
    }
};