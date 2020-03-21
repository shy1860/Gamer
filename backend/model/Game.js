const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Game = new Schema({
  game_title: {
    type: String
  },
  platform: {
    type: String
  },
  genre: {
    type: String
  },
  rating: {
    type: String
  },
  publisher: {
    type: String
  },
  release: {
    type: String
  },
  status: {
    type: String
  }
  
}, {
  collection: 'games'
})

module.exports = mongoose.model('Game', Game)