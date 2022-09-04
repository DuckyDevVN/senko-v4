const chalk = require("chalk")

module.exports = {
    name: 'disconnec',
    execute: async () => {
      console.log(chalk.red(`Mongodb: Disconnec`));
    }
};