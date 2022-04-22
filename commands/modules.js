const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('modules')
		.setDescription(`Permet d'afficher la page des modules.`),
	async execute(client, interaction) {
        const modules = new MessageEmbed()
		.setColor('#ffffff')
        .setDescription('**__Voici la liste des modules.__**')
        .addField("⏱ Anti-Spam", `\`true / false\``, true)
        .addField("💥 Anti-Raid", `\`true / false\``, true)
        .addField("🔗 Anti-Link", `\`true / false\``, true)
        .addField("🤖 Anti-addbot", `\`true / false\``, true)
        .addField("👾 Anti-selfbot", `\`true / false\``, true)
        .addField("💢 Anti-everyone", `\`true / false\``, true)
		interaction.reply({ embeds: [modules] })
	},
};