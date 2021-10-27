import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';

import configureStore, { history } from './store';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppLayout from './containers/AppLayout'
import Login from './containers/Login';
import {IntialValueObj, AppRootContext} from './contexts/AppRoot';
import UnAutharizedDashboard from './containers/UnAutharizedDashboard';
import PageNotFound from './containers/PageNotFound';
const intialStore = {
  userInfo: {
    // isAdmin: 1
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
              <Redirect to="/unautharized/speech-to-text" />
            </Route>
            <Route path="/unautharized" component={UnAutharizedDashboard} />
            <Route path="/login" component={Login} />
            <Route path="/s2t" render={(props) => <AppLayout {...props} />} />
            {/* <Route path='/404' render={(props) => <PageNotFound {...props} />}  /> */}
            {/* <Redirect from='/*' to='/login' /> */}
          </AppRootContext.Provider>
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
