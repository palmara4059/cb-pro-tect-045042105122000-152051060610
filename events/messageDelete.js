const { Message, MessageEmbed } = require('discord.js');

/**
 * @param {Message} message
 */

module.exports = {
    name: 'messageDelete',
    async execute(client, message) {
        if(message.author.bot) return;
        const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`${message.author} à supprimer un message dans #${message.channel.name} sur le serveur ${message.guild.name}.`)
        .addField(`Message Content`, `${message.content}`)
		logChannel.send({ embeds: [cyberLog] })
        let mention = message.mentions.members.first();
        console.log(logChannel)
        if (!mention) return;
        console.log(mention)

        const ghostPing = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${mention.user.username}#${mention.user.discriminator} à été ghost ping par ${message.author.username} !`)
        message.channel.send({ embeds: [ghostPing] })

    },
};