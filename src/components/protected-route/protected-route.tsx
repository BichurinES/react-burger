import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useToken from '../../services/token';
import { LOGIN_PATH } from '../../utils/constants';

const ProtectedRoute: FC<{ [name: string]: any }> = ({ children, ...rest }) => {
  const { refreshToken } = useToken();
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (refreshToken
          ? (children)
          : (<Redirect to={{ pathname: LOGIN_PATH, state: { from: location } }} />))
      }
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
