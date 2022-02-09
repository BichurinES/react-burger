export type TUser = {
  email: string;
  name: string;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  qty?: number;
};

export type TIngredientId = Pick<TIngredient, '_id'>;
export type TMainIngredient = TIngredient & { _cartId: string };
export type TBun = (Omit<TIngredient, 'type'> & { type: 'bun' });

export type TRemovedIngredient = Pick<TMainIngredient, '_cartId' | 'price'>;
export type TReplacingItems = { initialIndex: number, targetIndex: number };

export type TOrderDetails = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type TInfoTooltip = {
  message: string;
};

export type TSuccessResetPassword = {
  success: boolean;
  message: string;
};
