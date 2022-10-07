const {
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType
} = require("discord.js");
const config = require("../../../config");
const { Senko } = require("../../structures/Senko");
const emojiXX = ['<:xx1:1017828444857450608>',
                '<:xx2:1017828708419112991>',
                '<:xx3:1017828782486327297>',
                '<:xx4:1017828813549350953>',
                '<:xx5:1017828874886844528>',
                '<:xx6:1017828899150905506>',];

module.exports = {
  name: "taixiu",
  description: "dùng để chơi mini game tài xỉu!",
  usages: ["sktaixiu <số tiền cược>"],
  /**
   *
   * @param { Senko } client
   * @param { Message } message
   * @param { String[] } args
   */
  execute: async (client, message, args) => {
    let bet = parseInt(args[0]);
    if (!bet) return message.reply({ content: 'Vui lòng nhập số coin đặt cược!' });
    const coinUser = await client.moneyUser(message.author.id);
    if (coinUser < bet) return message.reply({ content: 'Số coin còn lại của bạn không đủ để chơi!' });
    const dice = []

    for (let index = 0; index < 3; index++) {
      const f = Math.floor(Math.random() * emojiXX.length)
      dice.push(f)
    };

    const startEmbed = new EmbedBuilder()
      .setColor('Yellow')
      .setDescription('Vui lòng chọn Tài hoặc Xỉu')
      .setFooter({ text: `Số tiền cược: ${bet}` });

    const component = new ActionRowBuilder()
      .setComponents(
        new ButtonBuilder()
          .setLabel('Tài')
          .setStyle(ButtonStyle.Success)
          .setCustomId('tai'),
        new ButtonBuilder()
          .setLabel('Xỉu')
          .setStyle(ButtonStyle.Success)
          .setCustomId('xiu')
      );

    const msg = await message.reply({ embeds: [startEmbed], components: [component] });
    const collector = msg.createMessageComponentCollector({
      filter: interaction => interaction.user.id === message.author.id,
      componentType: ComponentType.Button,
      time: 60_000
    });

    collector.on('collect', interaction => {
      interaction.update({ embeds: [], components: [], content: '<a:xx360:1017827697872883782><a:xx360:1017827697872883782><a:xx360:1017827697872883782>' });
      setTimeout(async() => await interaction.editReply({ embeds: [], components: [], content: `${emojiXX[dice[0]]}<a:xx360:1017827697872883782><a:xx360:1017827697872883782>` }), 1000);
      setTimeout(async() => await interaction.editReply({ embeds: [], components: [], content: `${emojiXX[dice[0]]}${emojiXX[dice[1]]}<a:xx360:1017827697872883782>` }), 2000);
      setTimeout(async() => await interaction.editReply({ embeds: [], components: [], content: `${emojiXX[dice[0]]}${emojiXX[dice[1]]}${emojiXX[dice[2]]}` }), 3000);
      collector.stop(interaction.customId);
    });

    collector.on('end', (collected, reason) => {
      const choose = reason;
      const kq = ['tai', 'xiu'][Math.floor(Math.random() * 2)];
      const embed = new EmbedBuilder().setColor("Yellow");
      if (kq === choose) {
        embed.setDescription(`Chúc mừng <@${message.author.id}>, kết quả là **${kq === 'tai' ? 'Tài' : 'Xỉu'}** và bạn đã thắng được **${bet * 2}** coin!`);
      } else {
        embed.setDescription(`Rất tiếc <@${message.author.id}>, kết quả là **${kq === 'tai' ? 'Tài' : 'Xỉu'}** và bạn đã mất toàn bộ số tiền cược!`);
        bet = -bet;
      };
      client.addMoney(message.author.id, { coin: bet });

      setTimeout(() => msg.edit({ content: '\u200b', embeds: [embed] }), 3000);
    })
  }
};
