const { model, Schema } = require('mongoose')

const player = {
  coins: model(
    "coisPlayer",
    new Schema({
      _id: String,
      coin: Number,
      gold: Number,
      pre: Number,
      epic: Number
    })
  ),
  bank: model(
    "bankPlayer",
    new Schema({
      _id: String,
      coin: Number,
      gold: Number,
      pre: Number,
      epic: Number
    })
  )
};
const cooldown = {
  daily: model(
    "dailycooldowns",
    new Schema({
      _id: String,
      cooldownTime: Number
    })
  )
};
module.exports = { player, cooldown }
// const pumpking = new model(
//   'pumpking',
//   new Schema({
//     _id: String,
//     pumpking: Number
//   }))