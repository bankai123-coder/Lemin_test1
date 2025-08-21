const { DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const logger = require('../utils/logger');

function setupConnectionHandler(sock, saveCreds, reconnectCallback) {
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            logger.info('QR Code received, scan it with WhatsApp');
        }
        
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            
            if (shouldReconnect) {
                logger.info('Connection closed, reconnecting...');
                setTimeout(() => reconnectCallback(), 3000);
            } else {
                logger.info('Connection closed permanently');
            }
        } else if (connection === 'open') {
            logger.info('✅ Connected to WhatsApp successfully!');
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

module.exports = { setupConnectionHandler };