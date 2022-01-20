import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProtectedRoute from '../protected-route/protected-route';
import ProtectedFromAuthRoute from '../protected-from-auth-route/protected-from-auth-route';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Popups from '../popups/popups';
import {
  Home, Login, Register, ForgotPassword, ResetPassword, Profile, Ingredients, NotFound,
} from '../../pages';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/profile';
import useToken from '../../services/token';

function App() {
  const dispatch = useDispatch();
  const { ingredients, profile } = useSelector((state) => state);
  const { ingredientsRequest } = ingredients;
  const { user, getUserRequest } = profile;
  const location = useLocation();
  const background = location.state?.background;
  useEffect(() => {
    const { refreshToken } = useToken();
    const isUser = Object.keys(user).length;
    dispatch(getIngredients());
    if (refreshToken && !isUser) {
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
        <Popups background={background} />
      </Main>
    </>
  );
}

export default App;
