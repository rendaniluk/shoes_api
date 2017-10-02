'use strict'
const mongoose = require('mongoose');
module.exports = function(mongoURL) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoURL);

  const shoesApiSchema = mongoose.Schema({
    id: Number,
    color: String,
    brand: String,
    price: Number,
    size: Number,
    in_stock: Number
  });

  shoesApiSchema.index({
    id: 1
  }, {
    unique: true
  });

  const shoesApi = mongoose.model('shoes', shoesApiSchema);

  return {
    shoesApi
  };
};
