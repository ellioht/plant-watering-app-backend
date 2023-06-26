const mongoose = require('mongoose');
// Plant collection
const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  water: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});
const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;