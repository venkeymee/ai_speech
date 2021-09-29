import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import AdminLayout from '../AdminDashboard';
import UserLayout from '../UserDashboard';
import { userRoutes, adminRoutes } from '../../config/routes';
import { AppRootContext } from '../../contexts/AppRoot';
import TopNavBar from '../../components/TopNavBar';
import Footer from '../../components/Footer';
import { getUserData } from '../../utils/index';
import SideBar from '../../components/SideBar';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingTop: '75px',
      backgroundColor: '#eeeeee'
    },
  }),
);

function AppLayout(props) {
  const classes = useStyles();
  const theam = useContext(AppRootContext);
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      // console.log("##prop: ", prop)
      if (!prop.childRoutes) {
        // console.log('##path: ', (props.match.path + prop.layout + prop.path));
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
          // console.log("##apath => ", props.match.path + prop.layout + prop.path + childRoute.path)
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setOpen(!open)
  };
  // const [state, setState] = useState({});
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let userInfo = props.userInfo;
  if(userInfo && !userInfo.role) {
    userInfo = getUserData && getUserData();
  }
  const {role, isAdmin} = userInfo || {};
  const routesToBeRendered = (!isAdmin) ? userRoutes : adminRoutes;
  
  return (
    <div  className={classes.root}>
      <TopNavBar
        {...props}
        title={theam.projectTitle}
        role={role}
        routesToBeRendered={routesToBeRendered}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />      
      <SideBar
        {...props}
        color={'green'}
        routes={routesToBeRendered}
        open={open}
        handleDrawerClose={handleDrawerClose}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <main className={clsx(classes.content)} style={{ paddingTop: '80px', paddingBottom: '30px' }}>
        <Switch>
          <Route exact path="/s2t/" >
            <Redirect to={(!isAdmin ? "/s2t/user/speech-to-text" : "/s2t/admin/user-management")} />
          </Route>
          {
            getRoutes(routesToBeRendered)
          }          
          <Redirect from='/s2t/*' to={(!isAdmin ? "/s2t/user/speech-to-text" : "/s2t/admin/user-management")} />
        </Switch>
      </main>
      <Footer 
        {...props}
        open={open}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log("state: ", state);
  return {
    userVerified: state.isVerfied,
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(AppLayout);
