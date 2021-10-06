import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button } from "@material-ui/core";

import { LOGGING_IN, LOGGED_IN } from './redux/actionTypes';
import InputField from '../../components/common/InputField';
import InputPasswordField from '../../components/common/InputPasswordField';
import InputSubmitButton from '../../components/common/InputSubmitButton';
import { Notification, notify } from '../../components/ToastNotification';
import './Login.css';
import { loginAction } from './redux/actions';

class LogIn extends Component {
  constructor(props) {
    super(props);
    console.log("Login-props: ", props);
    this.state = {
      email: '',
      password: '',
      errorObj: {}
    }
  }

  doFieldValidation = ({name='', id, value}) => {
    const {errorObj} = this.state;
    switch(id){
      case 'email': 
        const regex = /^[\w]+.[\w]*$/;
        if (!regex.test(value)) {
          errorObj[id] = `Please enter a valid ${name}`;
          this.setState({ errorObj });
        } else {
          delete errorObj[id];
          this.setState({ errorObj });
        }
        break;
      case 'password':
      default: 
        if(id && !value){
          errorObj[id] = `Please enter a valid ${name}`;
          this.setState({errorObj});
        } else {
          delete errorObj[id];
          this.setState({errorObj});
        }
    }
    
  }

  handleOnChange = (e) => {
    let currentTarget =  e.currentTarget;
    const {id, value, name} = currentTarget;
    // debugger;
    this.doFieldValidation({name, id, value});

    this.setState({
      [id]: value
    });
  }
  
  doFormValidation = async () => {
    let {errorObj, email, password} = this.state;
    const fieldsToBeValidated = ['email', 'password'];
    for(var index in fieldsToBeValidated){
      this.doFieldValidation({
        name: fieldsToBeValidated[index],
        id: fieldsToBeValidated[index],
        value: this.state[fieldsToBeValidated[index]]
      });
    }

    // fieldsToBeValidated.forEach((field) => {
    // });
  }

  handleSubmit = async (e) => {
    await this.doFormValidation();
    // debugger;
    const {email, password, errorObj} = this.state;
    if(Object.values(errorObj).length > 0){
      notify.error('Please enter the valid Username & Password!');
      return;
    }

    let result = await this.props.handleLogInButton({email, password});
    // console.log('>>>>>>>code: ', result);
    if(result && result.status == '200'){
      notify.success('Successfully Logged-In');
      setTimeout(() => {
        this.props.history.push('/s2t');
      }, 2000);
    } else {
      const errMsg = (result && result.message) || 'Something went wrong while logging-in';
      notify.error(errMsg);
    }
  }
  
  componentWillReceiveProps(nextProps){
    console.log('nextProps: ', nextProps);
  }
  render(){
    const {email, password, errorObj} = this.state;
    return(
      <div className='container'>
        <div className='LoginForm'>
          <div style={{textAlign: 'center'}}>
            <h1> Login </h1>
          </div>
          <div>
            <InputField
              className="EmailId"
              id={"email"}
              error={errorObj && errorObj.email}
              helperText={errorObj && (errorObj.email)}
              label={"Email Id"}
              name={"Email Id"}
              placeholder={"Email Id"}
              onChange={(e) => this.handleOnChange(e)}
              value={email || ''}
              required={true}
              autoFocus={true}
              fullWidth={true}
            />
          </div>
          <div>
            <InputPasswordField
              className="Password"
              id={"password"}
              error={errorObj && errorObj.password}
              helperText={errorObj && (errorObj.password)}
              label={"Password"}
              name={"Password"}
              placeholder={"Password"}
              onChange={(e) => this.handleOnChange(e)}
              value={password || ''}
              required={true}
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
    userInfo: state.userInfo
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    intiateLogin: () => dispatch({type: LOGGING_IN}),
    handleLogInButton: (payload) => dispatch(loginAction(payload)),
    dispatch
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogIn);