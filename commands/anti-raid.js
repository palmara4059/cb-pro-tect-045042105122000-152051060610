const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('node:fs');
const schema = require('../schema/anti-spam');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anti-raid')
        .setDescription(`Permet d'activer ou de désactiver l'anti-spam !`)
        .addStringOption(option =>
            option.setName('etat')
                .setDescription('Selectionne un etat')
                .setRequired(true)
                .addChoices({name: 'on', value: 'on'}, {name: 'off', value: 'off'})),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: 'Require la perm ban', ephemeral: true });
        const guild = await schema.findOne({Guild: interaction.guild.id})
        if (!guild) {
            await new schema({Guild: interaction.guild.id, etat: interaction.options.getString('etat') === 'on' ? true : false}).save()
            if (interaction.options.getString('etat') === 'on') {
                const onStat = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription(`✅ l'anti-spam à été activer par ${interaction.user.username} !`)
            return interaction.reply({ embeds: [onStat] })
            } else {
                const onStat = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription(`✅ l'anti-spam à été désactiver par ${interaction.user.username} !`)
                return interaction.reply({ embeds: [onStat] })
            }
        }

        const etat = interaction.options.getString('etat');
        if (etat === "on") {
            const onStat = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription(`✅ l'anti-spam à été activer par ${interaction.user.username} !`)
            interaction.reply({ embeds: [onStat] })
            await guild.updateOne({ etat: true })
        }

        if (etat === "off") {
            const onStat = new MessageEmbed()
                .setColor('#ffffff')
                .setDescription(`✅ l'anti-spam à été désactiver par ${interaction.user.username} !`)
            interaction.reply({ embeds: [onStat] })
            await guild.updateOne({ etat: false })
        }
    },
};