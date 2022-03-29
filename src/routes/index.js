import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MainEditorContainer from '../components/editor/MainEditorContainer';
import { GuestRoute } from './ProtectedRoute';
import IndexLanding from '../components/LandingPageNew/IndexLanding';
import Login from '../components/authentication/login/Login';
import { AnimatePresence, motion } from 'framer-motion';
import Signup from '../components/authentication/signup/Signup';
import ResetPassword from '../components/authentication/reset-password/ResetPassword';

const Routes = () => {
  const pageVariants = {
    in: { opacity: 1 },
    initial: { opacity: 0 },
    transition: { duration: 0.5 },
  };
  const routes = [
    { component: MainEditorContainer, url: '/editor' },
    { component: Signup, url: '/signUp' },
    { component: Login, url: '/login' },
    { component: ResetPassword, url: '/forgotpassword' },
    { component: IndexLanding, url: '/' },
  ];
  return (
    <Router>
      <Switch>
        <AnimatePresence>
          <motion.div
            animate="in"
            className={`show `}
            exit="out"
            id="main-wrapper"
            initial="initial"
            variants={pageVariants}
          >
            {routes.map((route, index) => (
              <GuestRoute
                key={index}
                exact
                path={route.url}
                component={route.component}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </Switch>
    </Router>
  );
};

export default Routes;
