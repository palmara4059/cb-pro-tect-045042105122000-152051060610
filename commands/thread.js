const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const { ownerId } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('thread')
        .setDescription(`Permet d'envoyer un mp et d'ouvrir un ticket a un utilisateur.`)
        .addUserOption(option => option.setName("member").setDescription("Le membre qui doit être blacklist.").setRequired(true)),
    async execute(client, interaction) {
        const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande thread utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
        const member = interaction.options.getMember("member") || interaction.options.get("member");

        if (interaction.member.id !== ownerId) {
            const onStat = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`Vous avez pas la permission d'utiliser cette commande !`)
            return interaction.reply({ embeds: [onStat] })
        }

        const catTicket = client.guilds.cache.get("961666983806533662").channels.cache.get("962781064592494695");

        if (!client.guilds.cache.get("961666983806533662").channels.cache.find(c => c.topic == member.id)) {

            client.guilds.cache.get("961666983806533662").channels.create(`ticket-${member.user.username}`, {
                parent: catTicket,
                topic: member.id,
                permissionOverwrites: [{
                    id: member.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                    id: client.guilds.cache.get("961666983806533662").roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
                ],
                type: 'text',
            }).then(channel => {
                const test = new MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`Support créer pour contacter l'utilisateur ${member.user.tag}`)
                channel.send({ embeds: [test] })
            })

            member.send({ content: `Notre équipe souhaite vous contacter. Merci de répondre à ce message.` })
        }
    },
};