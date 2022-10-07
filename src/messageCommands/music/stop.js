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
  name: "stop",
  description: "dùng để dừng phát nhạc!",
  usages: ["skstop"],
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

    const success = await queue.stop();

    await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setDescription(`<@${message.author.id}>, đã dừng phát nhạc!`)
        .setImage('https://cdn.discordapp.com/attachments/1010007045157687389/1027241970529218600/intro.gif')
        .setColor("Yellow")
      ]
    }) 
  }
}
