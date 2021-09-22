import React, { useContext } from "react";
import { Container, Toolbar, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { AppRootContext } from '../../contexts/AppRoot';

export default function Footer(props) {
  const theam = useContext(AppRootContext);
  // return (
  //   <AppBar
  //     position="static"
  //     style={{
  //       backgroundColor: theam?.defaultTheam?.backgroundColor
  //     }}
  //   >
  //     <Container maxWidth="md">
  //       <Toolbar>
  //         <Typography variant="body1" color="inherit">
  //           © {(new Date().getFullYear())}
  //         </Typography>
  //       </Toolbar>
  //     </Container>
  //   </AppBar>
  // );
  return (
    <footer
      className="app-footer"
      style={{
        backgroundColor: theam?.defaultTheam?.backgroundColor,
        color: "white",
        height: "5vh"
      }}
    >
      <span className="d-inline-block" >Copyright. &copy; {new Date().getFullYear()}</span>
      {/* <Button
          href="https://codecanyon.net/cart/configure_before_adding/20978545?license=regular&ref=phpbits&size=source&support=bundle_12month&_ga=2.172338659.1340179557.1515677375-467259501.1481606413"
          target="_blank"
          size="small"
          color="primary"
        ><IntlMessages id="eCommerce.buyNow"/></Button> */}
    </footer>
  );
}
