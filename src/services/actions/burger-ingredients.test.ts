import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { socketMiddleware } from '../middleware/socket-middleware';
import {
  wsFeedActionNames, wsUserOrdersActionNames, TApplicationActions,
} from '../store';
import {
  WS_FEED_URL, WS_MY_ORDERS_URL, NORMA_API_URL, INGREDIENTS_URL, TEST_MAIN_INGREDIENT,
} from '../../utils/constants';
import { getIngredientsAction, getIngredientsSuccessAction, getIngredients } from './burger-ingredients';
import { initialState, TBurgerIngredientsState } from '../reducers/burger-ingredients';

const middlewares = [
  thunk,
  socketMiddleware(WS_FEED_URL, wsFeedActionNames, false),
  socketMiddleware(WS_MY_ORDERS_URL, wsUserOrdersActionNames, true),
];

const mockStore = configureMockStore<TBurgerIngredientsState,
ThunkDispatch<TBurgerIngredientsState, {}, TApplicationActions>>(middlewares);

describe('burger ingredients async actions', () => {
  afterEach(() => fetchMock.restore());

  it('creates GET_INGREDIENTS_SUCCESS when fetching ingredients has been done', () => {
    fetchMock.getOnce(`${NORMA_API_URL}${INGREDIENTS_URL}`, {
      body: { ok: true, data: [TEST_MAIN_INGREDIENT] },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      getIngredientsAction(),
      getIngredientsSuccessAction([TEST_MAIN_INGREDIENT]),
    ];
    const store = mockStore({ ...initialState, ingredients: [TEST_MAIN_INGREDIENT] });

    return store.dispatch(getIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
