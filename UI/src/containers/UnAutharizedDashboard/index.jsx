import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { userRoutes, adminRoutes } from '../../config/routes';
import { AppRootContext } from '../../contexts/AppRoot';
import TopNavBar from '../../components/TopNavBar';
import Footer from '../../components/Footer';
import { getUserData } from '../../utils/index';
import SpeechToText from '../SpeechToText';
import { SPEECH_TO_TEXT_SCREEN_PATH } from '../../config/routes';

function UnAutharizedDashboard(props) {
  const theam = useContext(AppRootContext);
  
  return (
    <div>
      <div>
        <TopNavBar {...props} title={theam.projectTitle} role={null} routesToBeRendered={null} />
      </div>
      <div style={{ paddingTop: '80px' }}>
        <Switch>
          <Route exact path="/unautharized/" >
            <Redirect to={'/unautharized' + SPEECH_TO_TEXT_SCREEN_PATH} />
          </Route>
          <Route
            exact
            path={props.match.path + SPEECH_TO_TEXT_SCREEN_PATH}
            render={(props) => <SpeechToText {...props} />}
          />
        </Switch>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default UnAutharizedDashboard;
