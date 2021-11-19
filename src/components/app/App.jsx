import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { ingredientsURL, filtrationKeys } from '../../utils/constants';
import { filterIngredients } from '../../utils/utils';

function App() {
  const [filteredIngredients, setFilteredIngredients] = React.useState({});

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
    <>
      <AppHeader />
      <Main filteredIngredients={filteredIngredients} />
    </>
  );
}

export default App;
