const { Message, EmbedBuilder } = require('discord.js');
const { Senko } = require('../../structures/Senko');

module.exports = {
    name: 'avatar',
    description: 'dùng để xem avatar của mình hoặc một ai đó',
    usages: ['skavatar', 'skavatar @Someone#1234', 'skavatar 123456789012345678', 'skavatar @Someone#1234 -nitro'],
    /**
     * 
     * @param { Senko } client
     * @param { Message } message
     * @param { String[] } args
     */
    execute: async (client, message, args) => {
        //  const member = /*await message.guild.members.fetch(client.getID(args[0])) || message.member message.memtions.members.first() || */message.guild.member.cache.get(args[0]) || message.member;
        const member = message.mentions.members.first() || message.member;
        client.getID(args[0]);

        let nitro;
        for (const a of args) {
            if (['-n', '-nitro'].includes(a.toLowerCase())) nitro = true;
        };

        const embed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`Avatar của ${member.displayName}!`)
            .setImage(
                nitro && member.avatar
                    ? member.displayAvatarURL({ extension: 'png', size: 4096 })
                    : member.user.displayAvatarURL({ extension: 'png', size: 4096 })
            );

        return message.reply({ embeds: [embed] });
    }
};