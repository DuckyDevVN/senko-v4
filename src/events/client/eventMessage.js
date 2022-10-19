const { Message } = require("discord.js");
const { Senko } = require("../../structures/Senko");
const config = require("../../../config");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js")

module.exports = {
    name: "messageCreate",

    /**
     *
     * @param { Message } message
     * @param { Senko } client
     */
    execute: async (message, client) => {
        if (message.author.bot) return;
        if (message.author.id !== "823082865553833984") return;
        const rate = Math.floor(Math.random() * 10000);

        if (rate > 100) return;

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(
                `Một quả bí ngô ma thuật đã xuất hiện ${config.emojis.emojiPumpkin}`
            );

            function button(disable) {
                const component = new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setLabel("Nhặt")
                        .setStyle(ButtonStyle.Success)
                        .setCustomId("event-pickup")
                        .setDisabled(disable)
                );
                return component;
            }

        const msg = await message.channel.send({
            embeds: [embed],
            components: [button(false)],
        });
        const collector = msg.createMessageComponentCollector({
            time: 10_000,
            componentType: ComponentType.Button,
        });

        let user;

        collector.on("collect", (interaction) => {
            if (!user) {
                interaction.reply({
                    content: `Chúc mừng <@${interaction.user.id}> đã nhặt được item bí ngô ${config.emojis.emojiPumpkin}`,
                    allowedMentions: { users: [] },
                });
                user = interaction.user.id;
            } else if (user)
                return interaction.reply({
                    content: "Rất tiếc, bạn đã chậm tay một bước mất rồi!",
                    ephemeral: true,
                });

            return collector.stop("collected");
        });

        collector.on("end", async (collected, reason) => {
            msg.edit({ components: [button(true)] });

            if (reason === "collected") {
                client.addPum(user, 1);
            } else
                msg.reply({ content: "Không ai đã nhặt quả bí ngô này cả!" });
        });
    },
};
