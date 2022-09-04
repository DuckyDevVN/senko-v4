const chalk = require("chalk")

module.exports = {
    name: 'connecting',
    execute: async () => {
      console.log(chalk.cyan(`Mongodb: Connecting...`));
    }
};