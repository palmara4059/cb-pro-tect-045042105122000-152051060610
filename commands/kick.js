const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription(`Permet de kick un utilisateur.`)
		.addUserOption(option => option.setName("member").setDescription("Le membre dont vous voulez effectué la vérification.").setRequired(true))
		.addStringOption((option) => option.setName('raison').setDescription('Raison du bannissement.').setRequired(true)),
	async execute(client, interaction) {
		const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande kick utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
		const author = interaction.member;
		const member = interaction.options.getMember("member") || await message.guild.members.fetch(args[0]);
		const raison = interaction.options.getString('raison');
		const timestamp = new Date();
		const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

		if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: 'Vous n\'avez pas la permission d\'effectué cette commande.', ephemeral: true });
		if (interaction.member.permissions.has('BAN_MEMBERS')) {
			const support = new MessageEmbed()
			.setColor('#202225')
			.setDescription(`Kick de ${member}`)
			.setThumbnail(`${member.user.displayAvatarURL()}`)
			.addFields(
				{ name: '**__Date du kick :__**', value: `${timestamp.toLocaleDateString(undefined, options)}`, inline: true},
				{ name: '**__Auteur du kick :__**', value: `${author.user.tag}`, inline: true},
				{ name: '**__Raison :__**', value: `\`${raison}\``},
			)
			.addFields(
				{ name: '**__Utilisateur kicker :__**', value: `${member.user.tag}`, inline: true},
				{ name: '**__Utilisateur ID :__**', value: `${member.user.id}`, inline: true},
			)
		interaction.reply({ embeds: [support] })
		member.kick({ reason: `${raison}` })
		}
	},
};