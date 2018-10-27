import React from 'react';
import PropTypes from 'prop-types';
import TokenManager from '../lib/token-manager';
import SignUp from './sign-up';
import Login from './login';

// TokenManager.removeToken();

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = { viewLogin: true };

    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {
    const { onSetUser } = this.props;
    TokenManager.isTokenValid().then((isValid) => {
      if (isValid) {
        TokenManager.getTokenPayload().then(onSetUser);
      }
    });
  }

  handleViewChange() {
    this.setState(state => ({ viewLogin: !state.viewLogin }));
  }

  render() {
    const { onSetUser } = this.props;
    const { viewLogin } = this.state;

    if (viewLogin) {
      return (
        <Login
          onSetUser={onSetUser}
          onViewChange={this.handleViewChange}
        />
      );
    }

    return (
      <SignUp
        onSetUser={onSetUser}
        onViewChange={this.handleViewChange}
      />
    );
  }
}

Auth.propTypes = {
  onSetUser: PropTypes.func.isRequired,
};

export default Auth;
