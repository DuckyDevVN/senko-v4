const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
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

    _loadEvents() {
        let total = 0;
        const path = join(__dirname, '../events');

        readdirSync(path)
            .filter(file => lstatSync(join(path, file)).isFile() && file.endsWith('.js'))
            .forEach(file => {
                const event = require(`../events/${file}`);
                this.on(event.name, (...args) => event.execute(...args, this));
                total++;
            });

        console.log(chalk.yellowBright(`Events loaded: `) + chalk.greenBright(total.toString()));
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

        console.log(chalk.yellowBright(`${folder} loaded: `) + chalk.greenBright(total.toString()));
        };
    build() {
        this._loadEvents();
        this._loadCommands('messageCommands');
        this._loadCommands('applicationCommands');
        this.login(config.token);
    };
};

module.exports = Senko;