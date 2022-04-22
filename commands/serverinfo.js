const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

/**
 * @param {Message} message
 */
const moment = require("moment");
moment.locale("FR");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription(`Permet de voir les informations du server`),
	async execute(client, interaction) {
        const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande serverinfo utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
		const servInfo = new MessageEmbed()
		.setColor('#ffffff')
        .setTitle(`Informations sur le serveur ${interaction.guild.name}`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .addField("Informations sur le serveur", `**Nom** : ${interaction.guild.name}\n**Propriétaire** : ${(await interaction.guild.fetchOwner())}\n**ID** : ${interaction.guild.id}\n**Description** : ${interaction.guild.description ? interaction.guild.description : "Aucune"}\n**Boost** : ${interaction.guild.premiumSubscriptionCount} (${interaction.guild.premiumTier})\n**Date de création** : <t:${Math.floor(interaction.guild.createdAt / 1000)}:F>`)
        .addField("Informations sur les stats", `**Salons** : ${interaction.guild.channels.cache.size}\n**Rôles** : ${interaction.guild.roles.cache.size}\n**Emojis** : ${interaction.guild.emojis.cache.size}\n**Membres** : ${interaction.guild.members.cache.size}`)
        .addField("Informations sur les salons spéciaux", `**Règlement** : ${interaction.guild.rulesChannel ? interaction.guild.rulesChannel : "Aucun"}\n**AFK** : ${interaction.guild.afkChannel ? interaction.guild.rulesChannel : "Aucun"}`)
        .setImage(interaction.guild.bannerURL({ dynamic: true, size: 4096 }))
        .setTimestamp()
        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

		interaction.reply({ embeds: [servInfo] })
	},
};