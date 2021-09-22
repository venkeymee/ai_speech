import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SpeechToText from '../SpeechToText';


class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        This is User UserDashboard
      </div>
    )
  }
}

export default UserDashboard;