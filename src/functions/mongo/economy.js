const Senko = require('../../structures/Senko');
const { player } = require('../../Schema/player');
/**
 * 
 * @param { Senko } client
 */
module.exports = (client) => {
  client.moneyUser = async(id) => {
    const data = await player.coins.findById(id);
    if (!data) return player.coins.create({ _id: id, coin: 0, gold: 0, pre: 0, epic: 0 });
    return data;
  };

  /**
   * 
   * @param { String } id
   * @param { Object } money
   * @param { Number? } money.coin
   * @param { Number? } money.gold
   * @param { Number? } money.pre
   * @param { Number? } money.epic
   */
  client.addMoney = async(id, money) => {
    client.moneyUser(id);
    await player.coins.findByIdAndUpdate(id, { $inc: money });
  };
};