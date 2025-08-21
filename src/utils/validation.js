// Input validation utilities
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function isValidPhoneNumber(number) {
    return /^\d{8,15}$/.test(number);
}

function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}

module.exports = {
    isValidUrl,
    isValidPhoneNumber,
    sanitizeInput
};