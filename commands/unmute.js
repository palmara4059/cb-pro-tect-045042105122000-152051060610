const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription(`Permet de unmute un utilisateur.`)
		.addUserOption(option => option.setName("member").setDescription("Le membre dont vous voulez effectué le mute.").setRequired(true))
		.addStringOption((option) => option.setName('raison').setDescription('Raison du unmute.').setRequired(true)),
	async execute(client, interaction) {
		const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande unmute utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
		const member = interaction.options.getMember("member") || await message.guild.members.fetch(args[0])
		const raison = interaction.options.getString('raison');
		const author = interaction.member;
		const timestamp = new Date();
		const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
		let role = interaction.guild.roles.cache.find(r => r.id === "939600313365717032");

		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'Require la perm ban', ephemeral: true });
		if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
			member.roles.remove(role);
			const muted = new MessageEmbed()
				.setColor('#202225')
				.setDescription(`Vous n'êtes plus sanctionné sur **${member.guild.name}**`)
				.setThumbnail(`${member.user.displayAvatarURL()}`)
				.addFields(
					{ name: '**__Date du unmute :__**', value: `${timestamp.toLocaleDateString(undefined, options)}`, inline: true },
					{ name: '**__Auteur du unmute :__**', value: `${author.user.tag}`, inline: true },
					{ name: '**__Raison :__**', value: `\`${raison}\`` },
				)
			member.send({ embeds: [muted] })
			const mutedConf = new MessageEmbed()
				.setColor('#202225')
				.setDescription(`unmute de ${member}`)
				.setThumbnail(`${member.user.displayAvatarURL()}`)
				.addFields(
					{ name: '**__Date du unmute :__**', value: `${timestamp.toLocaleDateString(undefined, options)}`, inline: true },
					{ name: '**__Auteur du unmute :__**', value: `${author.user.tag}`, inline: true },
					{ name: '**__Raison :__**', value: `\`${raison}\`` },
				)
				.addFields(
					{ name: '**__Utilisateur unmute :__**', value: `${member.user.tag}`, inline: true },
					{ name: '**__Utilisateur ID :__**', value: `${member.user.id}`, inline: true },
				)
			interaction.reply({ embeds: [mutedConf] })
		}
	},
};