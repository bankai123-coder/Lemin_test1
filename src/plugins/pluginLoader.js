const fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

async function loadPlugins() {
    const pluginsDir = path.join(__dirname);
    const plugins = [];

    try {
        const files = await fs.readdir(pluginsDir);
        
        for (const file of files) {
            if (file.endsWith('.plugin.js')) {
                try {
                    const plugin = require(path.join(pluginsDir, file));
                    if (plugin.enabled !== false) {
                        plugins.push(plugin);
                        logger.info(`Loaded plugin: ${plugin.name}`);
                    }
                } catch (error) {
                    logger.error(`Failed to load plugin ${file}:`, error);
                }
            }
        }
    } catch (error) {
        logger.error('Error loading plugins:', error);
    }

    return plugins;
}

module.exports = { loadPlugins };