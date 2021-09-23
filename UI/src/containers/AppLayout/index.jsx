import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminLayout from '../AdminDashboard';
import UserLayout from '../UserDashboard';
import { userRoutes, adminRoutes } from '../../config/routes';
import { AppRootContext } from '../../contexts/AppRoot';
import TopNavBar from '../../components/TopNavBar';
import Footer from '../../components/Footer';

function AppLayout(props) {
  const theam = useContext(AppRootContext);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      // console.log("##prop: ", prop)
      if (!prop.childRoutes) {
        console.log('##path: ', (props.match.path + prop.layout + prop.path));
        return (
          <Route
            exact
            path={props.match.path + prop.layout + prop.path}
            render={(props) => <prop.component {...props} componentName={prop.name} />}
            key={key}
          />
        );
      } else if (prop.childRoutes) {
        return (prop.childRoutes || []).map((childRoute) => {
          console.log("##apath => ", props.match.path + prop.layout + prop.path + childRoute.path)
          return (<Route
            exact
            path={props.match.path + prop.layout + prop.path + childRoute.path}
            render={(props) => <childRoute.component {...props} />}
            key={key}
          />
          )
        })
      } else {
        return null;
      }
    });
  };

  const {role} = props.userInfo;
  const routesToBeRendered = (role === 'user') ? userRoutes : adminRoutes;
  return (
    <div>
      <div>
        <TopNavBar {...props} title={theam.projectTitle} role={role} routesToBeRendered={routesToBeRendered} />
      </div>
      <div style={{ paddingTop: '80px', height: '80vh' }}>
        <Switch>

          <Route exact path="/s2t/" >
            <Redirect to={(role === 'user' ? "/s2t/user/speech-to-text" : "/s2t/admin/user-management")} />
          </Route>
          {
            getRoutes(routesToBeRendered)
          }
          {
            // !(props.userInfo && props.userInfo.role === 'user') ? (
            //   <>
            //     <Route exact path="/s2t/" >
            //       <Redirect to="/s2t/user/speech-to-text" />
            //     </Route>
            //     {getRoutes(userRoutes)}
            //   </>
            // ) : (
            //     <>
            //       <Route exact path="/s2t/" >
            //         <Redirect to="/s2t/admin/admininfo" />
            //       </Route>
            //       {/* <Route exact path={props.match.path + "/admin"} render={(props) => <AdminLayout {...props} />} /> */}
            //       {getRoutes(adminRoutes)}
            //     </>
            //   )
          }
        </Switch>
      </div>
      <div style={{ paddingTop: '20px' }}>
        <Footer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("state: ", state);
  return {
    userVerified: state.isVerfied,
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(AppLayout);