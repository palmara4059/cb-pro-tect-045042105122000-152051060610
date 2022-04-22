const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('node:fs');
const schema = require('../schema/guild');
const { tokens } = require('../config.json')
const { ownerId } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription(`Permet de start un bot`),
    async execute(client, interaction) {
        if (interaction.member.id !== ownerId) {
            const onStat = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`Vous avez pas la permission d'utiliser cette commande !`)
            return interaction.reply({ embeds: [onStat] })
        }
        const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande start utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
        client.login("NzM0NzczMDI1MTQ4MjM5OTQ0.XxWktA.UeB1crD3qAgodNrFHDwQ-DKlJ1s")
    },
};