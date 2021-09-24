import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';

import configureStore, { history } from './store';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppLayout from './containers/AppLayout'
import Login from './containers/Login';
import {IntialValueObj, AppRootContext} from './contexts/AppRoot';

const intialStore = {
  userInfo: {
    isAdmin: 1
  }
}
export const store = configureStore(intialStore);

function App(props) {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <AppRootContext.Provider value={IntialValueObj}>
            <Route exact path="/" >
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/s2t" render={(props) => <AppLayout {...props} />} />
          </AppRootContext.Provider>
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
