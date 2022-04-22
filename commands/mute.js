const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription(`Permet de muter un utilisateur.`)
		.addUserOption(option => option.setName("member").setDescription("Le membre dont vous voulez effectué la vérification.").setRequired(true))
		.addStringOption((option) => option.setName('raison').setDescription('Raison du bannissement.').setRequired(true)),
	async execute(client, interaction) {
		const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande mute utiliser par ${interaction.member}.`)
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
			member.roles.add(role);
			const muted = new MessageEmbed()
				.setColor('#202225')
				.setDescription(`Vous avez été sanctionné sur **${member.guild.name}**`)
				.setThumbnail(`${member.user.displayAvatarURL()}`)
				.addFields(
					{ name: '**__Date du mute :__**', value: `${timestamp.toLocaleDateString(undefined, options)}`, inline: true },
					{ name: '**__Auteur du mute :__**', value: `${author.user.tag}`, inline: true },
					{ name: '**__Raison :__**', value: `\`${raison}\`` },
				)
			member.send({ embeds: [muted] })

			const mutedConf = new MessageEmbed()
				.setColor('#202225')
				.setDescription(`Mute de ${member}`)
				.setThumbnail(`${member.user.displayAvatarURL()}`)
				.addFields(
					{ name: '**__Date du mute :__**', value: `${timestamp.toLocaleDateString(undefined, options)}`, inline: true },
					{ name: '**__Auteur du mute :__**', value: `${author.user.tag}`, inline: true },
					{ name: '**__Raison :__**', value: `\`${raison}\`` },
				)
				.addFields(
					{ name: '**__Utilisateur mute :__**', value: `${member.user.tag}`, inline: true },
					{ name: '**__Utilisateur ID :__**', value: `${member.user.id}`, inline: true },
				)
			interaction.reply({ embeds: [mutedConf] })
		}
	},
};