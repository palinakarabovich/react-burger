import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getUser } from '../../services/actions/authActions';
import Loader from '../loader/loader';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, ...rest }) => {

  const { loggedIn, authDataReceived } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!loggedIn) {
      dispatch(getUser());
    }
  }, []);

  if (!authDataReceived) {
    return <Loader />
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ?
          (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node
}