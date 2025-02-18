const express = require('express');
const router = express.Router();
const Joke = require('../models/joke');

// GET /api/joke - get random joke
router.get('/', async (req, res) => {
  try {
    const jokes = await Joke.find();
    if (jokes.length === 0) return res.status(404).json({ message: 'No jokes found' });

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.json(randomJoke);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/joke/all - get all jokes
router.get('/all', async (req, res) => {
  try {
    const jokes = await Joke.find();
    if (jokes.length === 0) return res.status(404).json({ message: 'No jokes found' });

    res.json(jokes);
  } catch (error) {
    console.error('Error fetching jokes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/joke/:id - vote on a joke
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { voteLabel } = req.body;

  try {
    const joke = await Joke.findById(id);

    if (!joke) return res.status(404).json({ message: 'Joke not found' });

    if (!joke.availableVotes.includes(voteLabel)) {
      return res.status(400).json({ message: 'Invalid vote label' });
    }

    const vote = joke.votes.find((v) => v.label === voteLabel);
    if (vote) {
      vote.value += 1;
    } else {
      joke.votes.push({ label: voteLabel, value: 1 });
    }

    await joke.save();
    res.json(joke);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;