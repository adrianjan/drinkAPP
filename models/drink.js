const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Models and Schemas

const DrinkSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Drink must be required']
  },
  ingredients: [String],
  price: {
    type: Number
  }
});

// create 'drinks' collection based on DrinkSchema
const Drink = mongoose.model('drink', DrinkSchema);

module.exports = Drink;
