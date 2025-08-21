const config = require('../config');

function extractCommandAndArgs(message) {
    const messageContent = message.message?.conversation || 
                         message.message?.extendedTextMessage?.text || '';
    
    if (!messageContent.startsWith(config.prefix)) {
        return { command: null, args: [] };
    }

    const fullCommand = messageContent.slice(config.prefix.length).trim();
    const [command, ...args] = fullCommand.split(' ');
    
    return { command: command.toLowerCase(), args };
}

function getMessageSender(message) {
    return message.key.participant || message.key.remoteJid;
}

function isFromOwner(message) {
    const sender = getMessageSender(message);
    return sender.includes(config.ownerNumber);
}

module.exports = {
    extractCommandAndArgs,
    getMessageSender,
    isFromOwner
};