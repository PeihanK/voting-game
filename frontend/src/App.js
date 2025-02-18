import styles from './styles/JokeDisplay.module.css';
import JokeDisplay from './components/JokeDisplay';


function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>        
        <h2>
        Welcome to Voting Game!
        </h2>  
        <p>
        Rate the funniest jokes and pick the best ones!
        </p> 
       
      </header>
      <main className={styles.main}>
        <JokeDisplay /> 
      </main>
      <footer className={styles.footer}>
        <p>
          © 2025 Voting Game
        </p>
      </footer>
    </div>
  );
}

export default App;
