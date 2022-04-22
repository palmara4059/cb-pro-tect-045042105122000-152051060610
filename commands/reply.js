const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const { ownerId, staffId } = require('../config.json');

/**
 * @param {Message} message
 */
const moment = require("moment");
moment.locale("FR");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reply')
		.setDescription(`Permet de repondre au ticket.`)
        .addStringOption((option) => option.setName('message').setDescription('Messages à envoyer !').setRequired(true)),
	async execute(client, interaction) {
        if (!staffId) {
            const onStat = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`Vous avez pas la permission d'utiliser cette commande !`)
            return interaction.reply({ embeds: [onStat] })
        }
        const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande reply utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
        const msg = interaction.options.getString('message');

        if(!interaction.channel.name.startsWith("ticket-")) {
            return console.log('Yes')
        }

        const topic = interaction.channel.topic;
        const user = await client.users.fetch(topic)

        const test = new MessageEmbed()
        .setColor('#2f3136')
        .setDescription(`Réponse de ${interaction.user.username}`)
        .addField("Contenu du message", `${msg}`, true)

        user.send({ embeds: [test] })

        interaction.reply({ embeds: [test] })
	},
};