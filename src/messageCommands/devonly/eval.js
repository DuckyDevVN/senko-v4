const { Message, EmbedBuilder } = require('discord.js');
const Senko = require('../../structures/Senko');
const config = require('../../../config')
module.exports = {
    name: 'eval',

    /**
     * 
     * @param { Senko } client
     * @param { Message } message
     * @param { String[] } args
     */
    execute: async (client, message, args) => {
        if (!client.config.botDevIDs.includes(message.author.id)) return;
        // Lệnh này nguy hiểm, chỉ cho những người tin tưởng dùng

        const process = args.join(' ');
        if (!process) return message.reply({ content: 'Vui lòng nhập một đoạn mã!' });

        let e;
        try {
            e = eval(process);
        } catch (err) {
            e = err;
        };

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setFields(
                { name: '📄 Input', value: `\`\`\`js\n${process}\n\`\`\`` },
                { name: '📄 Output', value: `\`\`\`${e}\`\`\`` },
                { name: '📄 Type of', value: `\`\`\`${typeof e}\`\`\`` }
            );

        message.channel.send({ embeds: [embed] });
    }
};