// Manage game states and user sessions
const gameStates = new Map();
const userSessions = new Map();

function getGameState(gameId) {
    return gameStates.get(gameId);
}

function setGameState(gameId, state) {
    gameStates.set(gameId, state);
}

function getUserSession(userId) {
    return userSessions.get(userId);
}

function setUserSession(userId, session) {
    userSessions.set(userId, session);
}

module.exports = {
    getGameState,
    setGameState,
    getUserSession,
    setUserSession
};