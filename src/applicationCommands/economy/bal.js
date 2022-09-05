const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const config = require('../../../config');
const { Senko } = require('../../structures/Senko');

module.exports = {
    name: 'xemcoin',
    description: 'xem số coin mà mình sỡ hữu',
    
    /**
     * 
     * @param { Senko } client
     * @param { ChatInputCommandInteraction } interaction
     * @param { any[] } args
     */
    execute: async (client, interaction, args) => {
      const bal = await client.moneyUser(interaction.user.id);
      const balField = [
        { name: '``SenkCoins``', value: `|_${bal.coin}${config.emojis.economyEmoji.coin}` },
        { name: '``SenkGoldCoin``', value: `|_${bal.gold}${config.emojis.economyEmoji.gold}` },
        { name: '``SenkPreCoin``', value: `|_${bal.pre}${config.emojis.economyEmoji.pre}` },
        { name: '``SenkEpicCoin``', value: `|_${bal.epic}${config.emojis.economyEmoji.epic}` },
      ]
      const embed = new EmbedBuilder()
      .setColor("Yellow")
      .setFields(balField)
      await interaction.reply({
        embeds: [embed]
      })
    }
};