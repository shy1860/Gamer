const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var Player = mongoose.model('Player',{
//     name: { type: String},
//     rank: { type: Number},
//     score: { type: Number},
//     time: { type: String},
//     gamesPlayed: {type: String},
//     status: {type: String}


// });
let Player = new Schema({
    player_name: {
      type: String
    },
    rank: {
      type: Number
    },
    score: {
      type: Number
    },
    time: {
      type: String
    },
    gamesPlayed: {
      type: String
    },
    status: {
      type: String
    }
  }, {
    collection: 'players'
  })

  
  
  module.exports = mongoose.model('Player', Player)