import React, { useState, useEffect } from 'react';
import styles from '../styles/JokeDisplay.module.css';

function JokeDisplay() {
  const [jokes, setJokes] = useState([]); // all jokes
  const [currentIndex, setCurrentIndex] = useState(0); // index of current joke
  const [loading, setLoading] = useState(true);

  const fetchJokes = async () => {
    try { 
      const response = await fetch('/api/joke/all'); // load all jokes
      if (!response.ok) throw new Error('Failed to fetch jokes');

      const data = await response.json();
      setJokes(data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
    }
  };

  // voting on joke
  const handleVote = async (label) => {
    try {
      const currentJoke = jokes[currentIndex]; // current joke
      const response = await fetch(`/api/joke/${currentJoke._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteLabel: label })
      });
      if (!response.ok) throw new Error('Failed to vote');

      // update joke with new vote
      const updatedJoke = await response.json();
      const updatedJokes = [...jokes];
      updatedJokes[currentIndex] = updatedJoke;
      setJokes(updatedJokes);
    } catch (error) {
      console.error('Error voting:', error);
    }

    // move to next joke
    // setCurrentIndex((prevIndex) => (prevIndex + 1) % jokes.length);
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (jokes.length === 0) return <div className={styles.container}>No jokes available</div>;
  const currentJoke = jokes[currentIndex];

  return (
    <div className={styles.container}>      
      {/* nav buttons + text */}
      <div className={styles.navigationButtons}>
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + jokes.length) % jokes.length)}
          className={styles.navButton}
        >
          ←
        </button>
        <div className={styles.jokeText}>
          <h2 className={styles.question}>{currentJoke.question}</h2>
          <p className={styles.answer}>{currentJoke.answer}</p>
        </div>
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % jokes.length)}
          className={styles.navButton}
        >
          →
        </button>
      </div>
      {/* buttons for voting */}
      <div className={styles.voteButtons}>
        {currentJoke.availableVotes.map((label) => {
          
          const voteCount = currentJoke.votes.find((vote) => vote.label === label)?.value || 0;

          return (
          <button 
          key={label} 
          onClick={() => handleVote(label)}
          className={styles.voteButton}
          >
            {label} {voteCount}
          </button>
          );
        })}
      </div>           
    </div>
  );
}

export default JokeDisplay;