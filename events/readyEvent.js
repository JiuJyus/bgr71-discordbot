module.exports = (client) => {
    const d = new Date();
    global.appPerfomance.startupTime = d;
    console.log(
        `[${d.toLocaleString()}]\tБОТ '${client.user.tag}' готов к работе`
    );
};
