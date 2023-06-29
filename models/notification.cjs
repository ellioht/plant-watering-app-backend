const mongoose = require('mongoose');
// Notification collection
const notificationSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId, // This is a reference to the Plant model
    ref: 'Plant', 
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;