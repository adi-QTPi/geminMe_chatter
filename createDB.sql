CREATE TABLE users (
    googleId VARCHAR(255) PRIMARY KEY,
    displayName VARCHAR(255) NOT NULL,
    emailId VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE chats (
    googleId VARCHAR(255),
    chatId UUID DEFAULT gen_random_uuid(),
    chat_history JSONB,

    PRIMARY KEY (googleId, chatId),

    FOREIGN KEY (googleId) REFERENCES users (googleId) ON DELETE CASCADE
);