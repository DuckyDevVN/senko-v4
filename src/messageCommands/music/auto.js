const { QueryType, QueueRepeatMode } = require("discord-player");
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
  name: "auto",
  description: "dùng để bật chế độ tự động!",
  usages: ["skauto"],
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

    const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

    await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setDescription(`<@${message.author.id}>, đã bật autoplay!`)
        .setColor("Yellow")
      ]
    }) 
  }
}
