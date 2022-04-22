const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

/**
 * @param {Message} message
 */
const moment = require("moment");
moment.locale("FR");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription(`Permet de voir les informations d'un membre`)
		.addUserOption(option => option.setName("member").setDescription("Le membre dont vous voulez effectué la commande.")),
	async execute(client, interaction) {
		const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande userinfo utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
		const member = interaction.options.getMember("member") || interaction.options.get("member") || interaction.member;
		const x = Date.now() - member.user.createdTimestamp;
        const created = Math.floor(x / 86400000);

		const userInfo = new MessageEmbed()
		.setColor('#ffffff')
		.setDescription(`Information de l'utilisateur ${member.user.username}`)
		.setThumbnail(member.user.displayAvatarURL())
		.addField("🔧 Création du compte", `Le ${moment(member.user.createdAt).format('L')} (Il y a ${created} jours)`, true)
		.addField("🔖 À rejoint", `Le ${moment(member.joinedAt).format('L')} (Il y a ${Math.floor(( Date.now() - member.joinedAt ) / 86400000)} jours)`, true)
		.addField("✨ Badges", `${(await member.user.fetchFlags()).toArray().length >= 1 ? (await member.user.fetchFlags()).toArray().join("\n") : "Non"}`, false)
		.setTimestamp()
		.setFooter({text: `ID : ${member.user.id}`, iconURL: member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024})})
		interaction.reply({ embeds: [userInfo] })
	},
};