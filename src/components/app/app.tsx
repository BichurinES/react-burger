import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProtectedRoute from '../protected-route/protected-route';
import ProtectedFromAuthRoute from '../protected-from-auth-route/protected-from-auth-route';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Popups from '../popups/popups';
import {
  Home, Login, Register, ForgotPassword, ResetPassword, Profile, Ingredients, Feed, NotFound,
} from '../../pages';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/profile';
import useToken from '../../services/token';
import { useDispatch, useSelector, useLocation } from '../../services/hooks';

const App = () => {
  const dispatch = useDispatch();
  const { ingredients, profile } = useSelector((state) => state);
  const { ingredientsRequest } = ingredients;
  const { user, getUserRequest } = profile;
  const location = useLocation();
  const background = location.state ? location.state.background : null;
  useEffect(() => {
    const { refreshToken } = useToken();
    dispatch(getIngredients());
    if (refreshToken && !user) {
      dispatch(getUser());
    }
  }, [user]);
  return (
    <>
      <AppHeader />
      <Main isLoading={ingredientsRequest || getUserRequest}>
        <DndProvider backend={HTML5Backend}>
          <Switch location={background || location}>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/feed" exact>
              <Feed />
            </Route>
            <ProtectedFromAuthRoute path="/login">
              <Login />
            </ProtectedFromAuthRoute>
            <ProtectedFromAuthRoute path="/register">
              <Register />
            </ProtectedFromAuthRoute>
            <ProtectedFromAuthRoute path="/forgot-password">
              <ForgotPassword />
            </ProtectedFromAuthRoute>
            <ProtectedFromAuthRoute path="/reset-password">
              <ResetPassword />
            </ProtectedFromAuthRoute>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            <Route path="/ingredients/:id">
              <Ingredients />
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
