const chalk = require("chalk")

module.exports = {
    name: 'connected',
    execute: async () => {
      console.log(chalk.green(`Mongodb: Connected`));
    }
};