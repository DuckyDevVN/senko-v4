const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',

    /**
     * 
     * @param { Client } client
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