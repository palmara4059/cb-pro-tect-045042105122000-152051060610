const { Message, MessageEmbed } = require('discord.js');
const { staffId } = require('../config.json');
const antilink = require('../schema/anti-link');
const antispam = require('../schema/anti-spam');
const UserMap = new Map();

/**
 * @param {Message} message
 */

module.exports = {
	name: 'messageCreate',
	async execute(client, message) {
		if (message.author.bot) return;
		interaction = message;

		if (message.channel.type === "DM") {
			const catTicket = client.guilds.cache.get("961666983806533662").channels.cache.get("966067053423374357");

			if (!client.guilds.cache.get("961666983806533662").channels.cache.find(c => c.topic == message.author.id)) {

				client.guilds.cache.get("961666983806533662").channels.create(`ticket-${message.author.username}`, {
					parent: catTicket,
					topic: message.author.id,
					permissionOverwrites: [{
						id: message.author.id,
						allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
					},
					{
						id: client.guilds.cache.get('961666983806533662').roles.cache.get('966509769579962439'),
						allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
					},
					{
						id: client.guilds.cache.get("961666983806533662").roles.everyone,
						deny: ['VIEW_CHANNEL'],
					}
					],
					type: 'text',
				}).then(channel => {

					const test = new MessageEmbed()
						.setColor('#2f3136')
						.setDescription(`Demande d'aide de l'utilisateur ${message.author.tag}`)
						.setImage(message.attachments.size > 0 ? message.attachments.first().url : "")
						.addField("Contenu du message", `${message.content ? message.content : "test"}`, true)
					channel.send({ embeds: [test] })
				})
				const confirm = new MessageEmbed()
					.setColor('#2f3136')
					.setDescription(`**✅ Votre message a été transmis à l'équipe support.** Le support vous répondra dès que possible.`)

				message.author.send({ embeds: [confirm] })
			}

			if (client.guilds.cache.get("961666983806533662").channels.cache.find(c => c.topic == message.author.id)) {
				const channel = client.guilds.cache.get("961666983806533662").channels.cache.find(c => c.topic == message.author.id)

				const test = new MessageEmbed()
					.setColor('#2f3136')
					.setDescription(`Demande d'aide de l'utilisateur ${message.author.tag}`)
					.setImage(message.attachments.size > 0 ? message.attachments.first().url : "")
					.addField("Contenu du message", `${message.content ? message.content : "test"}`, true)
				channel.send({ embeds: [test] })

			}
		}

		if(message.channel.type === "DM") return;

		const gId = await antispam.findOne({ Guild: message.guild.id })
		if (!gId) return;
		console.log(gId)

		if (gId.etat === true) {
			if (UserMap.get(message.author.id)) {
				const UserData = UserMap.get(message.author.id)
				const { lastMessage, timer } = UserData
				let difference = message.createdTimestamp - lastMessage.createdTimestamp;
				let msgCount = UserData.msgCount;

				if (difference > 3000) {
					clearTimeout(timer);
					UserData.msgCount = 1;
					UserData.lastMessage = message;
					UserData.timer = setTimeout(() => {
						UserMap.delete(message.author.id)
					}, 360000)
					UserMap.set(message.author.id, UserData)
				} else {
					msgCount++;
					if (msgCount >= 5) {
						await message.channel.send(`Attention ${message.author}, vous envoyez trop de messages en peu de temps !`);
						message.channel.bulkDelete("3");
					}
					if (msgCount >= 6) {
						return;
					}
					if (msgCount >= 7) {
						return;
					} else {
						UserData.msgCount = msgCount;
						UserMap.set(message.author.id, UserData)
					}
				}

			} else {
				let fn = setTimeout(async () => {
					UserMap.delete(user.id)
				}, 360000)
				UserMap.set(message.author.id, {
					msgCount: 1,
					lastMessage: message,
					timer: fn
				})
			}
		}


		const idGuild = await antilink.findOne({ Guild: message.guild.id })
		if (!idGuild) return;
		console.log(idGuild)

		if (idGuild.etat === true) {
			let content = message.content.split(" ")
			let count = 0;

			for (let i = 0; i < content.length; i++) {

				if (content[i].match(new RegExp(/<@!*&*[0-9]+>/g))) count++;
			}

			if (count > 5) {
				await message.channel.send(`Attention ${message.author}, vous mentionnez trop de fois dans un seul message !`)
			}

			let typeLink = ['http', 'https', 'https://', '.gg', '.gg/', 'gg/', 'www', 'www.', '.fr', '.com', '.eu', '.tk', '.net', '.org', '.xyz', '.io'];
			let gif = [".gif", "https://cdn.discordapp.com/", "https://cdn.discordapp.com/attachments/"]
			let LinkText = false;

			for (var i in typeLink) {
				if (message.content.toLocaleLowerCase().includes(typeLink[i].toLowerCase())) LinkText = true;
			}

			for (var i in gif) {
				if (message.content.toLocaleLowerCase().includes(gif[i].toLowerCase())) return;
			}

			if (LinkText) {
				await message.delete()
				await message.channel.send(`Attention ${message.author}, les liens ne sont pas acceptés !`)
			}

		}

	},
};