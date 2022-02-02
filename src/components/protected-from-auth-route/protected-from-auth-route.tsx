import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useToken from '../../services/token';

const ProtectedFromAuthRoute: FC<{ [name: string]: any }> = ({ children, ...rest }) => {
  const { refreshToken } = useToken();
  return (
    <Route
      {...rest}
      render={
        () => (!refreshToken
          ? (children)
          : (<Redirect to="/" />))
      }
    />
  );
};

ProtectedFromAuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedFromAuthRoute;
