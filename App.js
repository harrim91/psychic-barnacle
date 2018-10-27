import React from 'react';
import Auth from './src/auth';
import App from './src';

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
