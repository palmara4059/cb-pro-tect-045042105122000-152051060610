const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription(`ping test staff`),
    async execute(client, interaction) {
        const logChannel = client.guilds.cache.get("961666983806533662").channels.cache.find(channel => channel.topic === "cyber-logs");
		const cyberLog = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription(`commande staff utiliser par ${interaction.member}.`)
		.addField("🔧 ID du compte :", `${interaction.member.id}`, true)
		.addField("🔧 Serveur ID :", `${interaction.guild.id}`, true)
		.addField("🔧 Nom du serveur  :", `${interaction.guild.name}`, true)
		logChannel.send({ embeds: [cyberLog] })

        await interaction.deferReply()
        let StaffArray = [];
        let StaffOnlineArray = [];
        let StaffOfflineArray = [];

        client.guilds.cache.get("961666983806533662").members.cache.forEach(async (member) => {
            if (!member.roles.cache.has("966509769579962439")) return;
            else {
                if (member.presence !== null && (member.presence.status === "online" || member.presence.status === "dnd")) {
                    StaffArray.push(member.user.tag);
                    StaffOnlineArray.push(member.user.tag);
                } else {
                    StaffArray.push(member.user.tag);
                    StaffOfflineArray.push(member.user.tag);
                }
            }
        })

        const mapStaff = StaffArray.map(m => m);
        const mapStaffOnline = StaffOnlineArray.map(m => m)
        const mapStaffOffline = StaffOfflineArray.map(m => m)

        setTimeout(async () => {
            await interaction.editReply({ embeds: [new MessageEmbed().addField("staff", `\`\`\`${StaffArray.length}\`\`\``, true).addField("staff en ligne", `\`\`\`${StaffOnlineArray.length}\`\`\``, true).addField("staff hors ligne", `\`\`\`${StaffOfflineArray.length}\`\`\``, true).addField("staff", `\`\`\`${mapStaff.length === 0 ? 'aucun' : mapStaff.join("\n")}\`\`\``, true).addField("staff en ligne", `\`\`\`${StaffOnlineArray.length === 0 ? "aucun" : mapStaffOnline.join("\n")}\`\`\``, true).addField("staff hors ligne", `\`\`\`${StaffOfflineArray.length === 0 ? "aucun" : mapStaffOffline.join("\n")}\`\`\``, true)] })
        }, 2000)
    },
};