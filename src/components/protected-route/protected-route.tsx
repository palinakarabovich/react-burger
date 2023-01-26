import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getUser } from '../../services/actions/authActions';

type TLocationTemplate = {
  from?: any;
}

const ProtectedRoute: React.FC<RouteProps & { children?: React.ReactNode; onlyForAuth: boolean }> = (
  { onlyForAuth, children, ...rest }) => {

  const location = useLocation<TLocationTemplate>();
  const { loggedIn } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!loggedIn) {
      //@ts-ignore
      dispatch(getUser());
    }
  }, []);

  if (!onlyForAuth && loggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !loggedIn) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;


