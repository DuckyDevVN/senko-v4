const { Senko } = require('../../structures/Senko');
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'ready',

    /**
     * 
     * @param { Senko } client
     */
    execute: async (client) => {
        client.player.on("trackStart", async (queue, track) => {
            const playerInfo = await queue.generateStatistics();
            const timestamp = queue.getPlayerTimestamp();
            console.log(timestamp)
            const field = [
                { name: "Channel:", value: `|_\`\`${track.author}\`\`` , inline: true, },
                { name: "Views:", value: `|_\`\`${track.views}\`\`` , inline: true, },
                { name: "Add by:", value: `|_<@${track.requestedBy.id}>`, inline: true, },
                { name: "Room:", value: `|_<#${queue.metadata.voice.channel.id}>`, inline: true, },
                { name: "Auto Play:", value: playerInfo.latency.eventLoop && playerInfo.latency.eventLoop > 0 ? `|_True` : `|_False`, inline: true, },
                { name: "Track:", value: `|_${playerInfo.tracks} bài`, inline: true, },
            ];

            const embed = new EmbedBuilder()
            .setDescription(`Đang phát: **[${track.title}](${track.url})** \n \`\`\`css\n ${timestamp.current} ──────────────────────── ${track.duration}\`\`\``)
            .setFields(field)
            .setImage(track.thumbnail ? track.thumbnail : client.user.displayAvatarURL({ extension: 'png', size: 4096 }))
            .setAuthor({ name: `${track.author}` })
            .setColor("Yellow");
            const msg = await queue.metadata.channel.send({
                embeds: [embed]
            });
        });
        client.player.on("queueEnd", async (queue, track) => {
           const embed = new EmbedBuilder()
            .setDescription(`Đã phát hết nhạc trong danh sách!\n Dùng skplay để nghe thêm!`)
            .setImage('https://cdn.discordapp.com/attachments/1010007045157687389/1027241970529218600/intro.gif')
            .setColor("Yellow");
            queue.metadata.channel.send({
                embeds: [embed]
            });     
        });
    },
};