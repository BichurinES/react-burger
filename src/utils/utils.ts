import {
  TFeedIngredient, TOrderCard, TOrderUpdatedCard, TIngredient,
} from '../services/types/data';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dateDay = new Date(dateString).getDate();
  const today = new Date().getDate();
  const dayName = dateDay === today
    ? 'Сегодня' : dateDay === today - 1
      ? 'Вчера' : dateDay >= today - 4
        ? `${today - dateDay} дня назад` : date.toLocaleString('ru', { month: 'long', day: 'numeric' });
  const time = date.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });
  const timeOffset = -date.getTimezoneOffset() / 60;
  return `${dayName}, ${time} i-GMT${timeOffset > 0 ? `+${timeOffset}` : timeOffset}`;
};

export const getCardData = (card: TOrderCard, ingredients: ReadonlyArray<TIngredient>)
: TOrderUpdatedCard => {
  const updatedCard = { ...card, totalPrice: 0 };
  const updatedIngredients: Array<TFeedIngredient> = [];

  [...updatedCard.ingredients].forEach((ingredient) => {
    const fullIngredientData = ingredients.find(({ _id }) => _id === ingredient);

    if (fullIngredientData) {
      updatedCard.totalPrice += fullIngredientData.type === 'bun'
        ? fullIngredientData.price * 2 : fullIngredientData.price;
      updatedIngredients.push({
        _id: ingredient,
        price: fullIngredientData.price,
        name: fullIngredientData.name,
        image_mobile: fullIngredientData.image_mobile,
        type: fullIngredientData.type,
      });
    }
  });

  return {
    ...updatedCard,
    ingredients: [...updatedIngredients],
    createdAt: formatDate(updatedCard.createdAt),
  };
};
