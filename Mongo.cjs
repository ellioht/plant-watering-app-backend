const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ha26elliot:SxXOweZl3hTQwIIM@plant-watering-cluster.5zbmo0x.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

const collection = mongoose.model('collection', newSchema);

module.exports = collection;
