const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const { connection } = require('mongoose');
const { AsciiTable3 } = require('ascii-table3');
const { readdirSync, lstatSync } = require('fs');
const { join } = require('path');
const chalk = require('chalk');
const config = require('../../config');

class Senko extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.User
            ],
            allowedMentions: {
                users: [],
                roles: [],
                repliedUser: false
            },
            failIfNotExists: true,
            presense: {
                status: 'online',
                activities: {
                    name: 'Senko\'s Coffee',
                    type: ActivityType.Watching
                }
            }
        });

        this.messageCommands = new Collection();
        this.applicationCommands = new Collection();
    };

    _loadEvents(folder) {
        let total = 0;
        const path = join(__dirname, `../events/${folder}`);

        readdirSync(path)
            .filter(file => lstatSync(join(path, file)).isFile() && file.endsWith('.js'))
            .forEach(file => {
                const event = require(`../events/${folder}/${file}`);

                if (folder === 'mongo') {
                    connection.on(event.name, (...args) => event.execute(...args, connection));
                } else {
                    this.on(event.name, (...args) => event.execute(...args, this));
                };

                total++;
            });

        this[`${folder}EventsLoaded`] = total;
    };

    _loadCommands(folder) {
        let total = 0;
        const path = join(__dirname, `../${folder}`);

        readdirSync(path)
            .forEach(dir => {
                if (lstatSync(join(path, dir)).isDirectory()) {
                    readdirSync(join(path, dir))
                        .filter(file => lstatSync(join(path, dir, file)).isFile() && file.endsWith('.js'))
                        .forEach(file => {
                            const command = require(`../${folder}/${dir}/${file}`);
                            if (command.name) { this[folder].set(command.name, command); total++ };
                        });
                } else if (lstatSync(join(path, dir)).isFile() && dir.endsWith('.js')) {
                    const command = require(`../${folder}/${dir}`)
                    if (command.name) { this[folder].set(command.name, command); total++ };
                };
            });

        this[`${folder}Loaded`] = total;
    };

    build() {
        this._loadEvents('client');
        this._loadEvents('mongo');
        this._loadCommands('messageCommands');
        this._loadCommands('applicationCommands');
        this.login(config.token);

        const table = new AsciiTable3()
            .setHeading(chalk.green('Loaded'), chalk.green('Number'))
            .setAlignCenter(2)
            .addRowMatrix([
                [chalk.yellowBright('Client events'), this.clientEventsLoaded],
                [chalk.yellowBright('Database events'), this.mongoEventsLoaded],
                [chalk.yellowBright('Message Commands'), this.messageCommandsLoaded],
                [chalk.yellowBright('Application Commands'), this.applicationCommandsLoaded]
            ]);

        console.log(table.toString());
    };

    /**
     * 
     * @param { String } input
     */
    getID(input) {
        let output = input;

        if (output.startsWith('<@')) output.slice(2);
        if (output.startsWith('!')) output.slice(1);
        if (output.endsWith('>')) output.slice(0, -1);

        return output;
    };
};

module.exports = Senko;