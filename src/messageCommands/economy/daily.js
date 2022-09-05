const { Message, EmbedBuilder } = require('discord.js');
const config = require('../../../config');
const { Senko } = require('../../structures/Senko');
const { cooldown } = require('../../Schema/player');

module.exports = {
  name: 'diemdanh',
  usages: ['skdiemdanh'],
  /**
   * 
   * @param { Senko } client
   * @param { Message } message
   * @param { String[] } args
   */
  execute: async (client, message, args) => {
    const timeOut = 86400000;
    const data = cooldown.daily.findById(message.author.id);
    const coinAdd = Math.floor(Math.random() * 200);
    const embed = new EmbedBuilder()
      .setTitle(
        `${message.member.displayName}, cảm ơn bạn đã điểm danh ngày hôm nay và đây là phần thưởng của bạn ${coinAdd}${client.config.emojis.economyEmoji.coin}!`
      )
      .setThumbnail(message.member.displayAvatarURL())
      .setTimestamp(Date.now())
      .setColor('Yellow');
    if (data) {
      if (timeOut - (Date.now() - data.Thoigian) > 0) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(
                `${message.member.displayName}, Bạn đã điểm danh ngày hôm nay rồi bạn có thể điểm danh vào ngày mai!`
              )
              .setThumbnail(message.member.displayAvatarURL())
              .setTimestamp(Date.now())
              .setColor('Yellow'),
          ],
        });
      } else {
        cooldown.daily.findByIdAndUpdate(message.author.id, { cooldownTime: Date.now() });
        client.addMoney(message.author.id, { coin: coinAdd })
        return message.reply({
          embeds: [embed]
        })
      }
    } else {
      cooldown.daily.create({ _id: message.author.id, cooldownTime: Date.now() });
      client.addMoney(message.author.id, { coin: coinAdd })
      return message.reply({
        embeds: [embed]
      })
    }
  }
};