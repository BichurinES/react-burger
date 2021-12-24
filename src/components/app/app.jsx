import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Popups from '../popups/popups';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Main />
      <Popups />
    </div>
  );
}

export default App;
