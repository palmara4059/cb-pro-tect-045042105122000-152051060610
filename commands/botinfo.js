const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

/**
 * @param {Message} message
 */
const moment = require("moment");
moment.locale("FR");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botinfo')
		.setDescription(`Permet de voir les informations d'un membre`),
	async execute(client, interaction) {
		const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande botinfo utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
		
		const member = client.user.id;
		const x = Date.now() - client.user.createdTimestamp;
        const created = Math.floor(x / 86400000);

		const userInfo = new MessageEmbed()
		.setColor('#202225')
		.setDescription(`Information sur le bot`)
		.setThumbnail(client.user.displayAvatarURL())
		.addField("🔧 Création du bot", `Le ${moment(client.user.createdAt).format('L')} (Il y a ${created} jours)`, true)
		.addField("💾 Nombres de Serveurs", `${client.guilds.cache.size}`, false)
		.addField("👥 Nombres de Membres", `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`, false)
		.setTimestamp()
		.setFooter({text: `ID : ${client.user.id}`, iconURL: client.user.displayAvatarURL({dynamic: true, format: "png", size: 1024})})
		interaction.reply({ embeds: [userInfo] })
	},
};