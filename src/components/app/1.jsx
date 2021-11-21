import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientsURL, filtrationKeys } from '../../utils/constants';
import { filterIngredients } from '../../utils/utils';

function App() {
  const [filteredIngredients, setFilteredIngredients] = React.useState({});
  const [popups, setPopups] = React.useState({
    orderDetail: {
      isOpen: false,
      content: '',
    },
    ingredientDetail: {
      isOpen: false,
      content: {},
    }
  });

  function openPopup(popup, content) {
    setPopups({
      ...popups,
      [popup]: {
        content,
        isOpen: true,
      }
    });
  }

  function closeAllPopups() {
    const prevPopup = { ...popups };
    for (let popup in prevPopup) {
      prevPopup[popup].isOpen = false;
    }
    setPopups(prevPopup);
  }

  React.useEffect(() => {
    fetch(ingredientsURL)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.message)
        }
      })
      .then(res => setFilteredIngredients(filterIngredients(res.data, filtrationKeys)))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main filteredIngredients={filteredIngredients} openPopup={openPopup} />
      { 
        (popups.orderDetail.isOpen && <OrderDetails orderId={popups.orderDetail.content} closeAllPopups={closeAllPopups} />) ||
        (popups.ingredientDetail.isOpen && <IngredientDetails ingredient={popups.ingredientDetail.content} closeAllPopups={closeAllPopups} />)
      }
    </div>
  );
}

export default App;
