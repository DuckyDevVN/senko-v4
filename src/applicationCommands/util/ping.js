const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Senko } = require('../../structures/Senko');

module.exports = {
    name: 'ping',
    description: 'Kiểm tra độ trễ',
    
    /**
     * 
     * @param { Senko } client
     * @param { ChatInputCommandInteraction } interaction
     * @param { any[] } args
     */
    execute: async (client, interaction, args) => {
        const msg = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const embed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('🏓 Pong!')
            .setDescription(`Độ trễ: ${msg.createdTimestamp - interaction.createdTimestamp}ms\nDiscord API: ${client.ws.ping}ms`);

        return interaction.editReply({ content: '\u200b', embeds: [embed] });
    }
};