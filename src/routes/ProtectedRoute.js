import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !!JSON.parse(localStorage.getItem('userData')) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/landing',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export const GuestRoute = ({ component: Component, authed, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};
export const CustomRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !!JSON.parse(localStorage.getItem('userData')) === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
