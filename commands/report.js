const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription(`Permet de report un membre à l'équipe !`)
        .addUserOption(option => option.setName("member").setDescription("Le membre dont vous voulez effectué le report.").setRequired(true))
		.addStringOption((option) => option.setName('raison').setDescription('Raison du report.').setRequired(true)),
	async execute(client, interaction) {
		const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande report utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
        const member = interaction.options.getMember("member") || interaction.options.get("member");
        const raison = interaction.options.getString('raison');
		const reportChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "reports-logs");

		
		const reportLog = new MessageEmbed()
		.setColor('#2f3136')
        .setTitle(`Report de ${interaction.user.tag}`)
        .setDescription("Informations sur le report")
		.setThumbnail(member.user.displayAvatarURL())
		.addField("Nom du compte :", `${member.user.tag}`, true)
		.addField("ID du compte :", `${member.user.id}`, true)
		.addField("Raison du report :", `\`\`\`${raison}\`\`\``, false)
		reportChannel.send({ embeds: [reportLog] })


		const reportSend = new MessageEmbed()
		.setColor('#2f3136')
        .setTitle(`Report de ${interaction.user.tag}`)
        .setDescription(`✅ Le membre <@${member.user.id}> (${member.user.tag}) à été report avec succès !`)
		.setThumbnail(member.user.displayAvatarURL())
		.addField("Raison du report :", `\`\`\`${raison}\`\`\``, false)
		interaction.reply({ embeds: [reportSend] })
	},
};