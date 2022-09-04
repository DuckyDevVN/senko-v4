const { ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType  } = require('discord.js');
const { Senko } = require('../../structures/Senko');

module.exports = {
    name: 'avatar',
    description: 'Xem avatar của bạn hoặc người khác',
    options: [
      {
        name: 'user',
        description: 'Nhập một người dùng',
        type: ApplicationCommandOptionType.User
      },
      {
        name: 'nitro',
        description: 'Xem avatar tùy chỉnh của người có nitro',
        choices: [
            { name: 'Yes', value: 'yes' },
            { name: 'No', value: 'no' }
        ],
        type: ApplicationCommandOptionType.String
      }
    ],

    /**
     * 
     * @param { Senko } client
     * @param { ChatInputCommandInteraction } interaction
     * @param { any[] } args
     */
    execute: async (client, interaction, args) => {
        const [userID, nitro] = args;
        const member = await interaction.guild.members.fetch(userID || interaction.user.id);

        const embed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`Avatar của ${member.user.username}`)
            .setImage(
                nitro === 'yes' && member.avatar
                    ? member.displayAvatarURL({ extension: 'png', size: 4096 })
                    : member.user.displayAvatarURL({ extension: 'png', size: 4096 })
            );

        return interaction.reply({ content: '\u200b', embeds: [embed] });
    }
};