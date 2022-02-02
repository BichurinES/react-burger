import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useToken from '../../services/token';

const ProtectedRoute: FC<{ [name: string]: any }> = ({ children, ...rest }) => {
  const { refreshToken } = useToken();
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (refreshToken
          ? (children)
          : (<Redirect to={{ pathname: '/login', state: { from: location } }} />))
      }
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
