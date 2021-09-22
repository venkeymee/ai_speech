import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useLocation, NavLink } from "react-router-dom";
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { AnyARecord } from 'dns';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);



export default function SideBar(props: any) {
  const { handleDrawerClose, open, routes, color } = props;
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const [selectedDropDown, setSelectedDropDown] = React.useState(true);

  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const handleClick = (e: any, path: string) => {
    props.history.push(path);
  }

  const handleDropDown = (e: any, dropDownName: any) => {
    setSelectedDropDown(dropDownName);
  };

  const drawer = (
    <>
      <List>
        {
          (routes || []).map((route: any, index: number) => {
            let open = (selectedDropDown === route.name);
            if (!route.childRoutes) {
              return (
                <ListItem
                  button
                  key={route.name}
                  style={activeRoute(route.layout + route.path) ? { backgroundColor: "lightgrey" } : {}}
                  onClick={(e) => {
                    handleClick(e, `${props.match.path + route.layout + route.path}`);
                    handleDropDown(e, route.name);
                  }}
                >
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={route.name} />
                </ListItem>
              )
            } else {
              return (
                <>
                  <ListItem
                    button
                    key={route.name}
                    onClick={(e) => handleDropDown(e, route.name)}
                  // style={activeRoute(route.layout + route.path) ? { backgroundColor: "green" } : {}}
                  // onClick={(e) => handleClick(e, `${props.match.path + route.layout + route.path}`)}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={route.name} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {
                        (route.childRoutes || []).map((childRoute: any) => (
                          <ListItem
                            key={childRoute.path}
                            button
                            className={classes.nested}
                            style={activeRoute(childRoute.layout + childRoute.path) ? { backgroundColor: "lightgrey" } : {}}
                            onClick={(e) => {
                              handleClick(e, `${props.match.path + route.layout + route.path + childRoute.path}`);
                              handleDropDown(e, route.name);
                            }}
                          >
                            <ListItemIcon>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary={childRoute.name} />
                          </ListItem>
                        ))
                      }
                    </List>
                  </Collapse>
                </>
              )
            }
          })
        }
      </List>
    </>
  );

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      {drawer}
      {/* <Divider /> */}
    </Drawer>
  );
}