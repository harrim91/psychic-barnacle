import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { Button, Container, TextInput } from '../components';
import TokenManager from '../lib/token-manager';

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
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
    axios.post('https://hackmcr-2018-api.herokuapp.com/users', user)
      .then((response) => {
        TokenManager.setToken(response.data.token)
          .then(() => TokenManager.getTokenPayload())
          .then(token => onSetUser(token));
      })
      .catch((e) => {
        console.log(e.message);
        this.setState(state => ({
          error: 'Something went wrong',
          user: { ...state.user, password: '' },
        }), () => {
          setTimeout(() => {
            this.setState({error: '' });
          }, 5000);
        });
      });
  }

  render() {
    const { user, error } = this.state;
    return (
      <Container>
        <TextInput
          value={user.firstName}
          placeholder="First Name"
          onChangeText={text => this.handleChange('firstName', text)}
          textContentType="givenName"
        />
        <TextInput
          value={user.lastName}
          placeholder="Last Name"
          onChangeText={text => this.handleChange('lastName', text)}
          textContentType="familyName"
        />
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
        <Button text="Sign Up" onPress={this.handleSubmit} />
        {error && <Text style={styles.error}>{error}</Text>}
      </Container>
    );
  }
}

SignUp.propTypes = {
  onSetUser: PropTypes.func.isRequired,
};

export default SignUp;
