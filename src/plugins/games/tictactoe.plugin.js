const { createButtonMessage, createButton } = require('../../utils/buttons');

module.exports = {
    name: 'tictactoe',
    description: 'Play TicTacToe game',
    commands: ['tictactoe'],
    enabled: true,

    async execute(sock, msg) {
        const chat = msg.key.remoteJid;
        const buttons = [
            createButton('New Game', 'ttt_new'),
            createButton('Join Game', 'ttt_join')
        ];

        await sock.sendMessage(chat, createButtonMessage(
            '🎮 TicTacToe Game\nStart a new game or join an existing one!',
            buttons,
            'Choose an option to start playing'
        ));
    }
};