const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { version } = require("../package.json")
const { gestion, antiraid, ticket, moderation, autres } = require("./help.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription(`Permet d'afficher la page d'aide.`),
	async execute(client, interaction) {
		const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande help utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
		const help = new MessageEmbed()
			.setColor('#ffffff')
			.setTitle("Aide CyberProtect")
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription("Bot de protection avec multi module,\n pour de l'aide approfondie rejoignez le support.")
			.addField("🔰 Modération", `\`${moderation}\``, false)
			.addField("📦 Autres commandes", `\`${autres}\``, false)
			.setFooter({ text: `CyberProtect ${version} - Developed with ❤️ by Syrnaxx`, iconURL: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }) })
		interaction.reply({ embeds: [help] })
	},
};