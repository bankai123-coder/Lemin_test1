const { initializeWhatsApp } = require('./services/whatsapp');
const logger = require('./utils/logger');
const { ensureDirectories } = require('./utils/init');
const config = require('./config');

async function main() {
    try {
        logger.info(`Starting ${config.name}...`);
        logger.info(`Bot Number: ${config.botNumber}`);
        logger.info(`Owner Number: ${config.ownerNumber}`);
        
        await ensureDirectories();
        await initializeWhatsApp();
        
        logger.info('✅ Bot started successfully!');
        logger.info('Scan the QR code with WhatsApp to connect');
    } catch (error) {
        logger.error('❌ Failed to start bot:', error);
        process.exit(1);
    }
}

// Handle process termination
process.on('SIGINT', () => {
    logger.info('Bot shutting down...');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

main();