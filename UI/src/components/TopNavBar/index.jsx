import React, { useContext } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Drawer,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Button,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { AppRootContext } from '../../contexts/AppRoot';
import { Link } from 'react-router-dom';
import { getUserData, clearOutUserData } from '../../utils/index';
import { userRoutes, adminRoutes } from '../../config/routes';
import { notify } from '../ToastNotification';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
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
      backgroundColor: 'green'
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
    grow: {
      flexGrow: 1,
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);


export default function TopNavBar(props) {
  const userInfo = getUserData && getUserData();
  // console.log("TopNavbar-userInfo: ", userInfo);
  const { handleDrawerOpen, open } = props;
  const { isAdmin } = userInfo || {};
  
  let routesToBeRendered = [];
  if(![null, undefined].includes(isAdmin)){
    routesToBeRendered = (!isAdmin) ? userRoutes : adminRoutes;
  }
  console.log('TopNavbar-routesToBeRendered:', routesToBeRendered)
  const classes = useStyles();
  const theam = useContext(AppRootContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [userMenuEl, setUserMenuEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogout = () => {
    notify.info("you'll be logging out in 2 sec.");
    setTimeout(() => {
      handleMenuClose();
      clearOutUserData(); //remove user info, which we have stored while logging-in
      props.history && props.history.push('/login');
    }, 2000);
  };

  const handleLogIn = () => {
    handleMenuClose();
    props.history && props.history.push('/login');
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setUserMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenuEl(null);
  };

  const handleNavigation = (e) => {
    const currentTarget = e.currentTarget;
    // console.log(">>pushing-path: ", currentTarget.id);
    props.history && props.history.push(currentTarget.id);
    handleClose();
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{marginTop: '30px'}}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      {
        [0,1].includes(isAdmin) ? (
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          ) : (
            <MenuItem onClick={handleLogIn}>Log In</MenuItem>
        )
      }
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      {
        (routesToBeRendered || []).map((item) => {
          let navPath = (props.match.path + item.layout + item.path);
          // console.log(">>navPath: ", navPath);
          return (
            <MenuItem
              id={navPath}
              key={navPath}
              onClick={handleNavigation}
              // variant={'outlined'}
              // style={{
              //   marginLeft: '5px',
              //   border: '1px solid rgba(0, 0, 0, 0.23)',
              //   borderRadius: '10px',
              //   borderColor: 'white',
              //   color: 'white'
              // }}
            >
              {item.name}
            </MenuItem>
          )
        })
      }
      <MenuItem 
        onClick={handleProfileMenuOpen}
      >
        {/* <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton> */}
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const RenderActionMenu =(props) => (
      <>
        {
          (routesToBeRendered || []).map((item) => {
            let navPath = (props.match.path + item.layout + item.path);
            // console.log(">>navPath: ", navPath);
            return (
              <MenuItem
                id={navPath}
                key={navPath}
                onClick={handleNavigation}
                variant={'outlined'}
                style={{
                  marginLeft: '5px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: '10px',
                  borderColor: 'white',
                  color: 'white'
                }}
              >
                {item.name}
              </MenuItem>
            )
          })
        }
      </>
  );

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: (theam?.defaultTheam?.backgroundColor || 'green') }}
      >
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" noWrap>
            {props.title || 'Project Title'}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            
      {/* <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: 'inherit' }}
      >
        {(role === 'user') ? 'User Actions' : 'Admin Actions'}
      </Button> */}
            <RenderActionMenu {...props}/>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}