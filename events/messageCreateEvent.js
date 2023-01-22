module.exports = (message) => {
    const createdAt = message.createdAt.toLocaleString();
    const author = message.author.tag;

    console.log(`[${createdAt}] [${author}] [${message.content}]`);
};
