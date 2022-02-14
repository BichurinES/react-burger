export type TUser = {
  email: string;
  name: string;
};

export type TUserResponse = {
  accessToken: string;
  user: TUser;
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
export type TFeedIngredient = Pick<TIngredient, '_id' | 'name' | 'price' | 'image_mobile' | 'type'>;

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

export type TOrderCard = {
  _id: string;
  ingredients: ReadonlyArray<string>;
  status: 'created' | 'pending' | 'done';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOrderUpdatedCard = Omit<TOrderCard, 'ingredients'>
& {
  ingredients: Array<TFeedIngredient>,
  totalPrice: number,
};

export type TFeed = {
  success: boolean;
  orders: ReadonlyArray<TOrderCard>;
  total: number;
  totalToday: number;
};

export type TUpdatedFeed = Omit<TFeed, 'orders'> & { orders: ReadonlyArray<TOrderUpdatedCard> };
