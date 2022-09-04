require('dotenv').config();

const Senko = require('./structures/Senko');
const senko = new Senko();
module.exports = senko;

senko.build();