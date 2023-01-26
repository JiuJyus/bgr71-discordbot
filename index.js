require("dotenv").config();

global.appPerfomance = {
    startupTime: 0,
};
global.chats = [];

const { Client, Events, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const {
    readyEvent,
    messageCreateEvent,
    guildMemberAddEvent,
} = require("./events");
global.db = require("./db");

client.login(process.env.TOKEN);

client.on(Events.ClientReady, readyEvent);

client.on(Events.MessageCreate, messageCreateEvent);

client.on(Events.GuildMemberAdd, guildMemberAddEvent);
