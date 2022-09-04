const { Client } = require('discord.js');
const { player } = require('../../Schema/player');
/**
 * 
 * @param { Client } client
 */
module.exports = (client) => {
  client.bal = async(id) => {
    const data = await player.coins.findById(id)
    if (!data) return player.coins.create({ _id:id, coin:0, gold:0, pre:0, epic:0 })
    return data
  }
}