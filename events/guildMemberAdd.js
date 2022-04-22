const schema = require('../schema/guild');
const blacklist = require('../schema/blacklist');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(client, member) {
		/*const cyberBienvenue = client.guilds.cache.get(member.guild.id).channels.cache.find(channel => channel.topic === "cyber-bienvenue");
		const pingBvn = new MessageEmbed()
			.setColor('#2f3136')
			.setDescription(`Bienvenue à toi <@${member.id}>, nous te souhaitons un bon sejour sur ${member.guild.name}`)
		cyberBienvenue.send({ embeds: [pingBvn] })*/

		const guild = await schema.findOne({ Guild: member.guild.id })
		if (!guild) return;
		console.log(guild)

		if (guild.etat === true) {
			member.kick('Raidmode activer !')
		}

		const player = await blacklist.findOne({ userId: member.user.id })
		if (!player) return;
		console.log(player)

		if (player.etat === true) {
			member.ban({ reason: "inscrit dans la blacklist" })
		}
	},
};