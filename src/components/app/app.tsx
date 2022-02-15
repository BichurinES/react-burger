import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProtectedRoute from '../protected-route/protected-route';
import ProtectedFromAuthRoute from '../protected-from-auth-route/protected-from-auth-route';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Popups from '../popups/popups';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/profile';
import { getFeed } from '../../services/actions/ws-actions';
import useToken from '../../services/token';
import { useDispatch, useSelector, useLocation } from '../../services/hooks';
import {
  MAIN_PATH,
  FEED_PATH,
  FEED_ID_PATH,
  PROFILE_PATH,
  PROFILE_ORDERS_ID_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  FORGOT_PASSWORD_PATH,
  RESET_PASSWORD_PATH,
  INGREDIENTS_ID_PATH,
} from '../../utils/constants';
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Ingredients,
  Feed,
  OrderPage,
  NotFound,
} from '../../pages';

const App = () => {
  const dispatch = useDispatch();
  const { ingredients, profile, ws } = useSelector((state) => state);
  const { ingredientsRequest } = ingredients;
  const { user, getUserRequest } = profile;
  const { feedRequest, feed } = ws;
  const location = useLocation();
  const background = location.state ? location.state.background : null;
  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  useEffect(() => {
    const { refreshToken } = useToken();
    if (refreshToken && !user) {
      dispatch(getUser());
    }
    if (!feed) {
      dispatch(getFeed());
    }
  }, [user]);
  return (
    <>
      <AppHeader />
      <Main isLoading={ingredientsRequest || getUserRequest || feedRequest}>
        <DndProvider backend={HTML5Backend}>
          <Switch location={background || location}>
            <Route path={MAIN_PATH} exact>
              <Home />
            </Route>
            <Route path={FEED_PATH} exact>
              <Feed />
            </Route>
            <ProtectedFromAuthRoute path={LOGIN_PATH}>
              <Login />
            </ProtectedFromAuthRoute>
            <ProtectedFromAuthRoute path={REGISTER_PATH}>
              <Register />
            </ProtectedFromAuthRoute>
            <ProtectedFromAuthRoute path={FORGOT_PASSWORD_PATH}>
              <ForgotPassword />
            </ProtectedFromAuthRoute>
            <ProtectedFromAuthRoute path={RESET_PASSWORD_PATH}>
              <ResetPassword />
            </ProtectedFromAuthRoute>
            <ProtectedRoute path={PROFILE_ORDERS_ID_PATH} exact>
              <OrderPage />
            </ProtectedRoute>
            <ProtectedRoute path={PROFILE_PATH}>
              <Profile />
            </ProtectedRoute>
            <Route path={INGREDIENTS_ID_PATH}>
              <Ingredients />
            </Route>
            <Route path={FEED_ID_PATH}>
              <OrderPage />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </DndProvider>
        <Popups />
      </Main>
    </>
  );
};

export default App;
