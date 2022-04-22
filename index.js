const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, Intents } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const mongoose = require('mongoose');
const { countDocuments } = require('./schema/blacklist');
mongoose.connect("mongodb+srv://SyrnaxxDev:syrnaxx@cluster0.5cdgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false, autoIndex: false, poolSize: 10, serverSelectionTimeoutMS: 50000, socketTimeoutMS: 45000, family: 4 });
console.log('Database Connecter')

const client = new Client({
    partials: ['GUILD_MEMBER', 'USER', 'MESSAGE', 'CHANNEL', 'REACTION'],
    intents: 32767,
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

client.once('ready', async () => {
    console.log('Ready!');
    const db = require("./schema/blacklist");
    setInterval(async () => {
        client.user.setActivity(`${await (db.find().countDocuments({ etat: true }))} membres blacklists`, { type: 'STREAMING', url: 'https://www.twitch.tv/syrnaxx' })
    }, 10000);
});

const commands = [];
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(client, interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: `Une erreur s'est produite lors de l'exécution de cette commande !`, ephemeral: true });
    }
});

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log(`A commencé à rafraîchir les commandes de l'application (/).`);

        console.log(commands)

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Les commandes de l'application (/) ont été rechargées avec succès.`);
    } catch (error) {
        console.error(error);
    }
})();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

client.login(token);