import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useToken from '../../services/token';
import { MAIN_PATH } from '../../utils/constants';

const ProtectedFromAuthRoute: FC<{ [name: string]: any }> = ({ children, ...rest }) => {
  const { refreshToken } = useToken();
  return (
    <Route
      {...rest}
      render={
        () => (!refreshToken
          ? (children)
          : (<Redirect to={MAIN_PATH} />))
      }
    />
  );
};

ProtectedFromAuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedFromAuthRoute;
