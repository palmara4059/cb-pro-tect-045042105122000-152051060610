const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription(`Permet de ban un utilisateur.`)
		.addUserOption(option => option.setName("member").setDescription("Le membre dont vous voulez effectué la vérification.").setRequired(true))
		.addStringOption((option) => option.setName('raison').setDescription('Raison du bannissement.').setRequired(true)),
	async execute(client, interaction) {
		const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande ban utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })

		const author = interaction.member;
		const member = interaction.options.getMember("member") || await message.guild.members.fetch(args[0]);
		const raison = interaction.options.getString('raison');
		const timestamp = new Date();
		const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

		if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: 'Require la perm ban', ephemeral: true });
		if (interaction.member.permissions.has('BAN_MEMBERS')) {
			const support = new MessageEmbed()
				.setColor('#202225').setDescription(`Bannissement de ${member}`).setThumbnail(`${member.user.displayAvatarURL()}`)
				.addFields(
					{ name: '**__Date du bannissement :__**', value: `${timestamp.toLocaleDateString(undefined, options)}`, inline: true },
					{ name: '**__Auteur du bannissement :__**', value: `${author.user.tag}`, inline: true },
					{ name: '**__Raison :__**', value: `\`${raison}\`` }).addFields(
						{ name: '**__Utilisateur banni :__**', value: `${member.user.tag}`, inline: true },
						{ name: '**__Utilisateur ID :__**', value: `${member.user.id}`, inline: true })
			interaction.reply({ embeds: [support] })
			member.ban({ reason: `${raison}` })
		}
	},
};