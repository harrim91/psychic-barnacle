import React from 'react';
import axios from 'axios'
import Auth from './src/auth';
import App from './src';

axios.defaults.baseURL = 'https://hackmcr-2018-api.herokuapp.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    this.handleSetUser = this.handleSetUser.bind(this);
  }

  handleSetUser(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (user === null) {
      return <Auth onSetUser={this.handleSetUser} />;
    }

    return (
      <App user={user} />
    );
  }
}

export default () => <Main />;
