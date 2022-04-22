const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { ownerId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev')
		.setDescription(`ping test`),
	async execute(client, interaction) {
		const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande dev utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
		if (interaction.member.id !== ownerId) return;
		let ArrayGuilds = [];

        client.guilds.cache.forEach(guild => {
            ArrayGuilds.push(guild);
        })
		const userInfo = new MessageEmbed()
        .setColor('#ffffff')
        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

        ArrayGuilds.map(async e => userInfo.addField(e.name, `Serveur ID: **${e.id}**\nNombre de membres: **${e.memberCount}**\nOwner Id: **${e.ownerId}**\nOwner: **${await (await client.users.fetch(e.ownerId)).tag}**`))
        setTimeout(() => {
			interaction.reply({ embeds: [userInfo] })
		}, 2000);
	},
};