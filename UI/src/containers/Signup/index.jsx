import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Redirect, useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
// import toast, { Toaster } from 'react-hot-toast';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Notification, notify } from '../../components/ToastNotification';
import { signUpAPI } from '../../apis/user'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {/* <Link color="inherit" href="https://material-ui.com/"> */}
        {/* Your Website */}
      {/* </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp(props) {
const  [email,setEmail] = React.useState('');
const  [firstname,setFirstname] = React.useState('');
const  [lastname,setLastname] = React.useState('');
const  [password,setPassword] = React.useState('');
const  [address,setAddress] = React.useState('');
const [redirect,setRedirect] = React.useState('')
const register = async (event) => {
    console.log("values:::::::",firstname)
    if (!(email == '' || firstname == '' || password == '')) {
        const res = await signUpAPI({ email, firstname, lastname, password, address });
        console.log("res", res);
        if (res && res.status && res.status == 200) {
            notify.success('Registration successfully');
            setRedirect(res.data);
            // this.props.history.push("/s2t")
        } else {
            let errMsg = (res && res.message) || "'Something went wrong while sign-up'"
            notify.error(errMsg)
        }
    } else {
        notify.error("First-name and Email and password is mandotory! ");
    }
}
if (redirect) {
    return <Redirect to="/s2t" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" m={1} >
              Sign up
          </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="address"
                  type="address"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="address"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={register}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        {/* </Box> */}
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Notification />
    </ThemeProvider>
  );
}