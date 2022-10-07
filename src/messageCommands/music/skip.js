const { QueryType } = require("discord-player");
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

module.exports = {
  name: "skip",
  description: "dùng bỏ qua bài nhạc!",
  usages: ["skskip"],
  /**
   *
   * @param { Senko } client
   * @param { Message } message
   * @param { String[] } args
   * 
   */
  execute: async (client, message, args) => {
    const queue = client.player.getQueue(message.member.guild);

    if (!queue || !queue.playing) return message.channel.send(`<@${message.author.id}>, hiện tại không bài hát nào đang phát!`);

    const success = await queue.skip();

    await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setDescription(`<@${message.author.id}>, đã skip ${queue.current.title}!`)
        .setColor("Yellow")
      ]
    }) 
  }
}
