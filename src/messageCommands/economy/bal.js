const { Message, EmbedBuilder } = require('discord.js');
const config = require('../../../config');
const { Senko } = require('../../structures/Senko');

module.exports = {
    name: 'xemcoin',
    usages: ['skxemcoin'],
    /**
     * 
     * @param { Senko } client
     * @param { Message } message
     * @param { String[] } args
     */
    execute: async (client, message, args) => {
      const bal = await client.moneyUser(message.author.id);
      const balField = [
        { name: '``SenkCoins``', value: `|_${bal.coin}${config.emojis.economyEmoji.coin}` },
        { name: '``SenkGoldCoin``', value: `|_${bal.gold}${config.emojis.economyEmoji.gold}` },
        { name: '``SenkPreCoin``', value: `|_${bal.pre}${config.emojis.economyEmoji.pre}` },
        { name: '``SenkEpicCoin``', value: `|_${bal.epic}${config.emojis.economyEmoji.epic}` },
      ]
      const embed = new EmbedBuilder()
      .setColor("Yellow")
      .setFields(balField)
      return message.reply({
        embeds: [embed]
      })
    }
};