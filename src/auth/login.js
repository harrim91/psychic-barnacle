import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import axios from 'axios';
import {
  Button,
  Container,
  Link,
  TextInput,
} from '../components';
import TokenManager from '../lib/token-manager';
import colors from '../components/colors';

const styles = StyleSheet.create({
  error: {
    color: colors.red,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, value) {
    this.setState(state => ({
      user: {
        ...state.user,
        [key]: value,
      },
    }));
  }

  handleSubmit() {
    const { user } = this.state;
    const { onSetUser } = this.props;
    axios.post('https://hackmcr-2018-api.herokuapp.com/auth/login', user)
      .then((response) => {
        TokenManager.setToken(response.data.token)
          .then(() => TokenManager.getTokenPayload())
          .then(token => onSetUser(token));
      })
      .catch((e) => {
        console.log(e);
        this.setState(state => ({
          error: e.response.status === 401 ? e.response.data.message : 'Something went wrong',
          user: { ...state.user, password: '' },
        }), () => {
          setTimeout(() => {
            this.setState({ error: '' });
          }, 5000);
        });
      });
  }

  render() {
    const { user, error } = this.state;
    const { onViewChange } = this.props;
    return (
      <Container styles={[styles.container]}>
        <TextInput
          value={user.email}
          placeholder="Email"
          onChangeText={text => this.handleChange('email', text)}
          textContentType="username"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={user.password}
          placeholder="Password"
          onChangeText={text => this.handleChange('password', text)}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
        />
        <Button text="Login" onPress={this.handleSubmit} />
        <Link text="or sign up" onPress={onViewChange} />
        {error && <Text style={styles.error}>{error}</Text>}
      </Container>
    );
  }
}

Login.propTypes = {
  onSetUser: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
};

export default Login;
