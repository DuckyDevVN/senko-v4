const Senko = require('../../structures/Senko');
const { pumpking } = require('../../Schema/player');
/**
 * 
 * @param { Senko } client
 */
module.exports = (client) => {
  client.pumUser = async(id) => {
    const data = await pumpking.findById(id);
    if (!data) return pumpking.create({ _id: id, pum: 0 });
    return data;
  };

  /**
   * 
   * @param { String } id
   * @param { Number } pum
   */
  client.addPum = async(id, pum) => {
    client.moneyUser(id);
    await pumpking.findByIdAndUpdate(id, { $inc: pum });
  };
};