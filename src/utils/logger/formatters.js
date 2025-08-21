function formatError(error) {
    return {
        message: error.message,
        stack: error.stack,
        code: error.code
    };
}

function formatLogMessage(message, data = {}) {
    return {
        timestamp: new Date().toISOString(),
        message,
        ...data
    };
}

module.exports = {
    formatError,
    formatLogMessage
};