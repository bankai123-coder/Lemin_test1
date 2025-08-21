const fs = require('fs').promises;
const path = require('path');
const logger = require('./logger');

async function ensureDirectories() {
    const dirs = ['auth_info', 'src/plugins'];
    
    for (const dir of dirs) {
        try {
            await fs.mkdir(path.join(process.cwd(), dir), { recursive: true });
            logger.info(`Directory ${dir} ensured`);
        } catch (error) {
            logger.error(`Failed to create directory ${dir}:`, error);
            throw error;
        }
    }
}

module.exports = { ensureDirectories };