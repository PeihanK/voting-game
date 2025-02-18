const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
  question: String,
  answer: String,
  votes: [
    { label: String, value: Number }
  ],
  availableVotes: [String] 
});

module.exports = mongoose.model('Joke', JokeSchema);