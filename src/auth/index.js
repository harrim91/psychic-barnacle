import React from 'react';
import PropTypes from 'prop-types';
import TokenManager from '../lib/token-manager';
import SignUp from './sign-up';

class Auth extends React.Component {
  componentDidMount() {
    const { onSetUser } = this.props;
    TokenManager.isTokenValid().then((isValid) => {
      if (isValid) {
        TokenManager.getTokenPayload().then(onSetUser);
      }
    });
  }

  render() {
    const { onSetUser } = this.props;
    return (
      <SignUp onSetUser={onSetUser} />
    );
  }
}

Auth.propTypes = {
  onSetUser: PropTypes.func.isRequired,
};

export default Auth;
