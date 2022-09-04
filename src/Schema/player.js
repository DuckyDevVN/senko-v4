const { model, Schema } = require('mongoose')

const player = {
  coins: new model(
    "coisPlayer",
    new Schema({
      _id: String,
      coin: Number,
      gold: Number,
      pre: Number,
      epic: Number
    })
  ),
  bank: new model(
    "bankPlayer",
    new Schema({
      _id: String,
      coin: Number,
      gold: Number,
      pre: Number,
      epic: Number
    })
  )
}
module.exports = { player }
// const pumpking = new model(
//   'pumpking',
//   new Schema({
//     _id: String,
//     pumpking: Number
//   }))