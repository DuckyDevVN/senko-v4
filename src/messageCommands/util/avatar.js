const { Message, EmbedBuilder } = require('discord.js');
const { Senko } = require('../../structures/Senko');

module.exports = {
    name: 'avatar',
    description: 'dùng để xem avatar của mình hoặc một ai đó',
    usages: ['skavatar', 'skavatar <tag một ai đó>'],
    /**
     * 
     * @param { Senko } client
     * @param { Message } message
     * @param { String[] } args
     */
    execute: async (client, message, args) => {
        const member = await message.guild.members.fetch(client.getID(args[0])) || message.member;

        let nitro;
        for (const a of args) {
            if (['-n', '-nitro'].includes(a)) nitro = true;
        };

        const embed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`Avatar của ${member.displayName}!`)
            .setImage(
                nitro && member.avatar
                    ? member.displayAvatarURL({ extension: 'png', size: 4096 })
                    : member.user.displayAvatarURL({ extension: 'png', size: 4096 })
            );

        return message.reply({ content: '\u200b', embeds: [embed] });
    }
};