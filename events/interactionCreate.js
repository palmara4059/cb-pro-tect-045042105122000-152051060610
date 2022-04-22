const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {
		console.log(`${interaction.member} à exécuter une commande dans le salon #${interaction.channel.name} sur le serveur ${interaction.guild.name}.`);
		const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`${interaction.user.tag} à exécuter une commande dans le salon #${interaction.channel.name} sur le serveur ${interaction.guild.name}.`)
		logChannel.send({ embeds: [cyberLog] })
	},
};