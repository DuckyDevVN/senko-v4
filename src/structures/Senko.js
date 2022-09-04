const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const { readdirSync, lstatSync } = require('fs');
const chalk = require('chalk');

require('dotenv').config();

class Senko extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds
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
    };

    _loadEvents() {
        let total = 0;

        readdirSync('src/events')
            .filter(file => lstatSync(`src/events/${file}`).isFile() && file.endsWith('.js'))
            .forEach(file => {
                const event = require(`../events/${file}`);
                this.on(event.name, (...args) => event.execute(...args, this));
                total++;
            });

        console.log(chalk.yellowBright(`Events loaded: `) + chalk.greenBright(total.toString()));
    };

    build() {
        this._loadEvents();
        this.login(process.env.token);
    };
};

module.exports = Senko;