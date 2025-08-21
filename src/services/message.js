const logger = require('../utils/logger');
const { extractCommandAndArgs } = require('../utils/messageHandler');
const { loadPlugins } = require('../plugins/pluginLoader');

async function setupMessageHandler(sock) {
    const plugins = await loadPlugins();
    logger.info(`Loaded ${plugins.length} plugins`);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        try {
            const m = messages[0];
            if (!m.message || m.key.fromMe) return;

            const { command, args } = extractCommandAndArgs(m);
            if (!command) return;

            logger.info(`Command received: ${command} with args: ${args.join(' ')}`);

            let commandExecuted = false;

            for (const plugin of plugins) {
                if (plugin.commands.includes(command)) {
                    try {
                        await plugin.execute(sock, m, [command, ...args]);
                        commandExecuted = true;
                        logger.info(`Command ${command} executed by plugin ${plugin.name}`);
                        break;
                    } catch (error) {
                        logger.error(`Error executing command ${command} in plugin ${plugin.name}:`, error);
                    }
                }
            }

            if (!commandExecuted) {
                await sock.sendMessage(m.key.remoteJid, { 
                    text: `❌ Unknown command: ${command}\n\nType !menu to see available commands.`
                });
            }
        } catch (error) {
            logger.error('Error processing message:', error);
        }
    });
}

module.exports = { setupMessageHandler };