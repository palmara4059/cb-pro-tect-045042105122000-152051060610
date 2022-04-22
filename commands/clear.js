const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear').setDescription(`Permet de clear le salon.`)
        .addStringOption((option) => option.setName('nombre').setDescription('Nombre de message(s) à supprimer.').setRequired(true)),
    async execute(client, interaction) {
        const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande clear utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })
        const nombre = interaction.options.getString('nombre');
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'Require la perm MANAGE_MESSAGES', ephemeral: true });
        if (nombre >= 100) {
            const clearMFalse = new MessageEmbed().setColor('#ff0000').setDescription(`❌ Impossible de supprimer plus de 100 messages.`)
            interaction.reply({ embeds: [clearMFalse] });}
        if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
            const clearMessage = new MessageEmbed().setColor('#202225').setDescription(`✅ Suppression de ${nombre} messages !`)
            await interaction.reply({ embeds: [clearMessage] });
            interaction.channel.bulkDelete(nombre);}},};