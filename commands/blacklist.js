const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const blacklist = require('../schema/blacklist');
const { staffId } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription(`Permet de blacklist un utilisateur.`)
        .addUserOption(option => option.setName("member").setDescription("Le membre qui doit être blacklist.").setRequired(true))
        .addStringOption((option) => option.setName('raison').setDescription('Raison du bannissement.').setRequired(true))
        .addStringOption(option =>
            option.setName('etat')
                .setDescription('Selectionne un etat de blacklist')
                .setRequired(true)
                .addChoices({ name: 'oui', value: 'on' }, { name: 'non', value: 'off' })),
    async execute(client, interaction) {
        const member = interaction.options.getMember("member") || interaction.options.get("member");
        const raisonbl = interaction.options.getString('raison');
        const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
        const cyberLog = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`commande blacklist utiliser par ${interaction.member}.`)
            .addField("🔧 ID du compte :", `${interaction.member.id}`, true)
            .addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
            .addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
        logChannel.send({ embeds: [cyberLog] })
        const logBl = client.guilds.cache.get("961666983806533662").channels.cache.get('966347018349977700');
        const cyberBl = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`Nouvelle utilisateur Blacklist.`)
            .addField("🔧 Nom du compte :", `\`${member.user.tag}\``, false)
            .addField("🔧 ID du compte :", `\`${member.user.id}\``, false)
            .addField("🔧 Raison de la blacklist :", `\`${raisonbl}\``, false)
        logBl.send({ embeds: [cyberBl] })
        if (!staffId.includes (interaction.user.id)) {
            const onStat = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`Cette commande ne peut-être utiliser que par le staff du bot !`)
            return interaction.reply({ embeds: [onStat] })
        }

        if (staffId.includes (interaction.user.id)) {
            const player = await blacklist.findOne({ userId: member.user.id });

            if (!player) {
                await new blacklist({ userId: member.user.id, etat: interaction.options.getString('etat') === 'on' ? true : false, raison: raisonbl }).save()
                if (interaction.options.getString('etat') === 'on') {
                    const onStat = new MessageEmbed()
                        .setColor('#ffffff')
                        .setDescription(`✅ ${member.user.tag} à été blacklist par ${interaction.user.username} !`)
                    return interaction.reply({ embeds: [onStat] })
                } else {
                    const onStat = new MessageEmbed()
                        .setColor('#ffffff')
                        .setDescription(`✅ ${member.user.tag} à été unblacklist par ${interaction.user.username} !`)
                    return interaction.reply({ embeds: [onStat] })
                }
            }

            const etat = interaction.options.getString('etat');
            if (etat === "on") {
                const onStat = new MessageEmbed()
                    .setColor('#ffffff')
                    .setDescription(`✅ ${member.user.tag} à été blacklist par ${interaction.user.username} !`)
                interaction.reply({ embeds: [onStat] })

                await player.updateOne({ etat: true, raison: `${raisonbl}` })

                if (interaction.guild.id) {
                    if (!member.id) {
                        return;
                    }

                    if (member.id) {
                        client.guilds.cache.forEach(guild => {
                            guild.members.ban(member, { reason: 'Inscrit dans la blacklist' })
                        })
                    }
                }
            }

            if (etat === "off") {
                const onStat = new MessageEmbed()
                    .setColor('#ffffff')
                    .setDescription(`✅ ${member.user.tag} à été unblacklist par ${interaction.user.username} !`)
                interaction.reply({ embeds: [onStat] })

                await player.updateOne({ etat: false })
            }
        }
    },
};