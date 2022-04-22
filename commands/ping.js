const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(`ping ! slash`),
	async execute(client, interaction) {
        interaction.reply({ content: "pong !" })
	},
};