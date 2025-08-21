function createButton(text, id) {
    return {
        buttonId: id,
        buttonText: { displayText: text },
        type: 1
    };
}

function createButtonMessage(text, buttons, footer = '') {
    return {
        text,
        footer,
        buttons,
        headerType: 1
    };
}

module.exports = {
    createButton,
    createButtonMessage
};