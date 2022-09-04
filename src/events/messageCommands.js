const { Client, Message } = require('discord.js');
const config = require('../../config');

module.exports = {
    name: 'messageCreate',

    /**
     * 
     * @param { Message } message
     * @param { Client } client
     */
    execute: async (message, client) => {
        if (
            message.author.bot
            || !message.guild
            || (
                !message.content.toLowerCase().startsWith(config.prefix)
            )
        ) return;

        const [cmd, ...args] = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = client.messageCommands.get(cmd.toLowerCase()) || client.messageCommands.find(x => x.aliases?.includes(cmd.toLowerCase()));

        if (!command) return;

        try {
            command.execute(client, message, args);
        } catch (e) {
            console.log(e);
            message.reply({ content: 'Đã có lỗi xảy ra khi thực hiện lệnh này!' });
        };
    }
};