import React from 'react';
import { Text, StyleSheet } from 'react-native';
import axios from 'axios';
import {
  Button,
  Container,
  TextInput,
  Link,
} from '../../components';
import TokenManager from '../../lib/token-manager';
import colors from '../../components/colors';

const styles = StyleSheet.create({
  error: {
    color: colors.red,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
    const { navigation: { navigate } } = this.props;

    axios.post('/users', user)
      .then((response) => {
        axios.defaults.headers.common.Authorization = response.data.token;
        TokenManager.setToken(response.data.token)
          .then(() => TokenManager.getTokenPayload())
          .then(() => navigate('AddJourney'));
      })
      .catch((e) => {
        console.log(e.message);
        this.setState(state => ({
          error: 'Something went wrong',
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
    const { navigation: { navigate } } = this.props;

    return (
      <Container styles={[styles.container]}>
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
        <Link text="or login" onPress={() => navigate('Login')} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </Container>
    );
  }
}

export default SignUp;
