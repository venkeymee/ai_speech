import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button } from "@material-ui/core";

import { LOGGING_IN, LOGGED_IN } from './actionTypes';
import InputField from '../../components/common/InputField';
import InputPasswordField from '../../components/common/InputPasswordField';
import InputSubmitButton from '../../components/common/InputSubmitButton';
import { Notification, notify } from '../../components/ToastNotification';
import './Login.css';
import { loginAction } from './actions';

class LogIn extends Component {
  constructor(props) {
    super(props);
    console.log("Login-props: ", props);
    this.state = {
      emailId: '',
      password: '',
    }
  }

  handleOnChange = (e) => {
    const {id, value} = e.currentTarget;
    this.setState({
      [id]: value
    });
  }

  handleSubmit = (e) => {
    const {emailId, password} = this.state;
    console.log({emailId, password})
    this.props.handleLogInButton({emailId, password});
    this.props.history.push('/s2t');
  }
  
  render(){
    const {emailId, password} = this.state;
    return(
      <div className='container'>
        <div className='LoginForm'>
          <div style={{textAlign: 'center'}}>
            <h1> Login </h1>
          </div>
          <div>
            <InputField
              className="EmailId"
              id={"emailId"}
              // error={error}
              // helperText={helperText}
              label={"Email Id"}
              name={"Email Id"}
              placeholder={"Email Id"}
              onChange={(e) => this.handleOnChange(e)}
              value={emailId || ''}
              required={true}
              autoFocus={true}
              fullWidth={true}
            />
          </div>
          <div>
            <InputPasswordField
              className="Password"
              id={"password"}
              // error={error}
              // helperText={helperText}
              label={"Password"}
              name={"Password"}
              placeholder={"Password"}
              onChange={(e) => this.handleOnChange(e)}
              value={password || ''}
              required={true}
              autoFocus={true}
              fullWidth={true}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => this.handleSubmit(e)}
              className="mr-3 mb-2"
              // startIcon={<SaveIcon />}
              // disabled={disabled}
              fullWidth={true}

            >
              Login
            </Button>
          </div>
        </div>
        <Notification />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    intiateLogin: () => dispatch({type: LOGGING_IN}),
    handleLogInButton: (payload) => dispatch(loginAction(payload)),
    dispatch
  }
}

export default connect(null,mapDispatchToProps)(LogIn);