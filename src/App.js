import React, { useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './userContext/UserContext';
import { initialState, userReducer } from './userContext/userReducer';
import Routes from './routes/index';
import { IntlProvider } from 'react-intl';
import { messages } from '../src/components/shared/messages';
import 'bootstrap/dist/css/bootstrap.min.css';
import Helmet from 'react-helmet';

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  let Arabic_title = 'تصميم - رسومات مجانية للجميع';
  let English_title = 'DesignIn - Free Graphic Designs for everyone';
  let English_Description =
    'DesignIn offers an easy way to create online graphics in few minutes. Create social media graphics for free and share anywhere.';

  return (
    <IntlProvider
      locale={state.isArabic ? 'ar' : 'en'}
      messages={messages[state.isArabic === true ? 'ar' : 'en']}
    >
      <Helmet>
        <title>{state.isArabic ? Arabic_title : English_title}</title>
        <meta name="description" content={English_Description} />
      </Helmet>
      <UserProvider value={[state, dispatch]}>
        <Router>
          <Routes />
        </Router>
      </UserProvider>
    </IntlProvider>
  );
}

export default App;
