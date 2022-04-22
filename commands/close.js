const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { staffId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription(`Permet de fermer un ticket.`),
	async execute(client, interaction) {
        if (!staffId) {
            const onStat = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`Vous avez pas la permission d'utiliser cette commande !`)
            return interaction.reply({ embeds: [onStat] })
        }
        const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande reply utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
        const msg = interaction.options.getString('message');

        if(!interaction.channel.name.startsWith("ticket-")) {
            return console.log('Yes')
        }

        const topic = interaction.channel.topic;
        const user = await client.users.fetch(topic)

        const test = new MessageEmbed()
        .setColor('#2f3136')
        .setDescription(`❌ **Cette discussion a été fermée.** N'hésitez pas à nous recontacter si vous avez besoin de nous.`)

        user.send({ embeds: [test] })

        interaction.reply({ embeds: [test] })
        interaction.channel.delete()
	},
};