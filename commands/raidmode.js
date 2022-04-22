const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('node:fs');
const schema = require('../schema/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('raidmode')
        .setDescription(`Permet de passer le serveur en raidmode.`)
        .addStringOption(option =>
            option.setName('etat')
                .setDescription('Selectionne un etat')
                .setRequired(true)
                .addChoices({name: 'on', value: 'on'}, {name: 'off', value: 'off'})),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: 'Require la perm ban', ephemeral: true });
        const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande raidmode utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
        const guild = await schema.findOne({Guild: interaction.guild.id})
        if (!guild) {
            await new schema({Guild: interaction.guild.id, etat: interaction.options.getString('etat') === 'on' ? true : false}).save()
            if (interaction.options.getString('etat') === 'on') {
                const onStat = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription(`✅ Le RaidMode à été activé par ${interaction.user.username} !`)
            return interaction.reply({ embeds: [onStat] })
            } else {
                const onStat = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription(`✅ Le RaidMode à été désactivé par ${interaction.user.username} !`)
                return interaction.reply({ embeds: [onStat] })
            }
        }

        const etat = interaction.options.getString('etat');
        if (etat === "on") {
            const onStat = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription(`✅ Le RaidMode à été activé par ${interaction.user.username} !`)
            interaction.reply({ embeds: [onStat] })

            await guild.updateOne({ etat: true })
        }
        
        if (etat === "off") {
            const onStat = new MessageEmbed()
            .setColor('#ffffff')
            .setDescription(`✅ Le RaidMode à été désactivé par ${interaction.user.username} !`)
            interaction.reply({ embeds: [onStat] })

            await guild.updateOne({ etat: false })
        }
    },
};