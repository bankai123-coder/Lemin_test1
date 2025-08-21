const { default: makeWASocket, DisconnectReason } = require('@whiskeysockets/baileys');
const logger = require('../utils/logger');
const { initializeAuth } = require('./auth');
const { setupConnectionHandler } = require('./connection');
const { setupMessageHandler } = require('./message');

async function createWhatsAppClient() {
    try {
        const { state, saveCreds } = await initializeAuth();
        
        const sock = makeWASocket({
            printQRInTerminal: true,
            auth: state,
            logger: {
                level: 'silent',
                child: () => ({ level: 'silent' })
            }
        });

        return { sock, saveCreds };
    } catch (error) {
        logger.error('Failed to create WhatsApp client:', error);
        throw error;
    }
}

async function initializeWhatsApp() {
    try {
        logger.info('Initializing WhatsApp bot...');
        const { sock, saveCreds } = await createWhatsAppClient();
        
        await setupMessageHandler(sock);
        setupConnectionHandler(sock, saveCreds, initializeWhatsApp);
        
        logger.info('WhatsApp bot initialized successfully');
        return sock;
    } catch (error) {
        logger.error('Failed to initialize WhatsApp:', error);
        throw error;
    }
}

module.exports = { initializeWhatsApp };