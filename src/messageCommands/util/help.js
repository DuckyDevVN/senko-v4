const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { readdirSync } = require('fs');
const Senko = require('../../structures/Senko');

module.exports = {
    name: 'help',
    description: 'dùng để xem lệnh của bot',
    usages: ['skhelp', 'skhelp <tên lệnh>'],

    /**
     * 
     * @param { Senko } client
     * @param { Message } message
     * @param { String[] } args
     */
    execute: async (client, message, args) => {
        const command = args[0]
            ? client.messageCommands.get(args[0].toLowerCase()) || client.messageCommands.find(x => x.aliases?.includes(args[0].toLowerCase()))
            : null;

        if (command) {
            const fields = [];
            if (command.description) fields.push({ name: 'Mô tả lệnh', value: command.description });
            if (command.usages) fields.push({ name: 'Các cách dùng:', value: command.usages.join('\n') });
            if (command.cooldown) fields.push({ name: 'Thời gian chờ:', value: command.cooldown });

            const embed = new EmbedBuilder()
                .setTitle(`Trợ giúp về lệnh \`${command.name}\``)
                .setFields(fields)
                .setColor('Yellow')
                .setTimestamp();

            return message.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setTitle('Danh sách lệnh của Senko-san')
                .setColor('Yellow')
                .setFooter({ text: 'Dùng skhelp [tên lệnh] để xem thông tin cụ thể hơn!' });

            readdirSync('src/messageCommands').forEach(dir => {
                if (dir === 'devonly') return;

                const commands = [];
                client.messageCommands.filter(c => c.dir === dir).forEach(command => commands.push(command.name));

                embed.addFields({ name: `${dir.charAt(0).toUpperCase()}${dir.slice(1)}`, value: `\`${commands.join('`, `')}\`` });
            });

            return message.reply({ embeds: [embed] });
        };
    }
};