import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getUser } from '../../services/actions/authActions';
import Loader from '../loader/loader';


const ProtectedRoute: React.FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const { loggedIn, authDataReceived } = useSelector((store: any): any => store.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!loggedIn) {
      // @ts-ignore
      dispatch(getUser());
    }
  }, []);

  if (!authDataReceived) {
    return <Loader />
  }

  return (
    <Route
      {...rest}
      render={({ location }: any) =>
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