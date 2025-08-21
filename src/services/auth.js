const { useMultiFileAuthState } = require('@whiskeysockets/baileys');
const logger = require('../utils/logger');

async function initializeAuth() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info');
        logger.info('Authentication state initialized');
        return { state, saveCreds };
    } catch (error) {
        logger.error('Failed to initialize auth:', error);
        throw error;
    }
}

module.exports = { initializeAuth };