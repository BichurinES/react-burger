import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Popups from '../popups/popups';
import { getIngredients } from '../../services/actions/burger-ingredients';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Main />
      </DndProvider>
      <Popups />
    </div>
  );
}

export default App;
