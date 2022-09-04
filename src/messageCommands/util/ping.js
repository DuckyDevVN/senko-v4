const { Message, EmbedBuilder } = require('discord.js');
const { Senko } = require('../../structures/Senko');

module.exports = {
    name: 'ping',
    description: 'dùng để xem độ trễ của bot',
    usages: ['skping'],
    /**
     * 
     * @param { Senko } client
     * @param { Message } message
     * @param { String[] } args
     */
    execute: async (client, message, args) => {
        const msg = await message.reply({ content: 'Pinging...' });
        const embed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('🏓 Pong!')
            .setDescription(`Độ trễ: ${msg.createdTimestamp - message.createdTimestamp}ms\nDiscord API: ${client.ws.ping}ms`);

        return msg.edit({ content: '\u200b', embeds: [embed] });
    }
};