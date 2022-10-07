const { EmbedBuilder, GuildMember } = require("discord.js");
const { Senko } = require("../../structures/Senko");
const generateImage = require("../../canvas/imgaeWelcome");
const config = require("../../../config");

module.exports = {
  name: "guildMemberAdd",
  /**
   * 
   * @param { Senko } client
   * @param { GuildMember } member
   */
  execute: async (member, client) => {
    if (!member.user.bot) {
      const img = await generateImage(member);
      member.guild.channels.cache.get(welcomeChannelId).send({
          content: `<@${member.id}> Chào mừng bạn tới ${member.guild.name}!\nchúc bạn có một trải nghiệm thú zị<a<a<a:SenkoRainbow:981933949477609512>981933949477609512>981933949477609512>!`,
          files: [img]
      });
      const role = member.guild.roles.cache.get(config.roleMember);
      member.roles.add(role);
    } else {
      const role = member.guild.roles.cache.get(config.roleBots);
      member.roles.add(role)
    }
  }
}