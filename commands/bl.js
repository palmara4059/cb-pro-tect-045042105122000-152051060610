const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { staffId } = require('../config.json');
const userinfo = require('./userinfo');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bl')
        .setDescription(`Permet de voir la blacklist des utilisateur.`),
    async execute(client, interaction) {
        if (!staffId.includes (interaction.user.id)) {
            const onStat = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`Cette commande ne peut-être utiliser que par le staff du bot !`)
            return interaction.reply({ embeds: [onStat] })
        }
        await interaction.deferReply()
        const db = require("../schema/blacklist");
        let array = [];

        await db.find().then(async a => {
            await a.map(async schema => {
                array.push(`Nom du membres: ${await (await client.users.fetch(schema.userId)).tag}\n Membres Id: ${schema.userId}\nRaison: ${schema.raison}`)
            })
        })
        setTimeout(() => {
            interaction.editReply({ embeds: [new MessageEmbed().setColor('#ffffff').setDescription(array.map(e => e).join(`\n\n`))] })
        }, 3000);
    },
};