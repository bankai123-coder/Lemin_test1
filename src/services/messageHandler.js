const logger = require('../utils/logger');
const { loadPlugins } = require('../plugins/pluginLoader');
const { sanitizeInput } = require('../utils/validation');
const { extractCommandAndArgs } = require('../utils/messageHandler');

async function handleMessage(sock, message) {
    try {
        const plugins = await loadPlugins();
        const { command, args } = extractCommandAndArgs(message);
        
        if (!command) return;

        // Sanitize input
        const sanitizedArgs = args.map(arg => sanitizeInput(arg));

        // Find and execute plugin
        for (const plugin of plugins) {
            if (plugin.commands.includes(command)) {
                try {
                    await plugin.execute(sock, message, sanitizedArgs);
                    logger.info(`Command ${command} executed successfully`);
                } catch (error) {
                    logger.error(`Error executing command ${command}:`, error);
                    await sock.sendMessage(message.key.remoteJid, { 
                        text: 'Sorry, an error occurred while processing your request.' 
                    });
                }
                break;
            }
        }
    } catch (error) {
        logger.error('Error processing message:', error);
    }
}

module.exports = { handleMessage };