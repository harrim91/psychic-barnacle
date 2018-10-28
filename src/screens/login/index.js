import React from 'react';
import { Text, StyleSheet } from 'react-native';
import axios from 'axios';
import {
  Button,
  Container,
  Link,
  TextInput,
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

  componentDidMount() {
    const { navigation: { navigate } } = this.props;

    TokenManager.isTokenValid().then((isValid) => {
      if (isValid) {
        TokenManager.getToken()
          .then((token) => {
            axios.defaults.headers.common.Authorization = token;
            navigate('AddJourney');
          });
      }
    });
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

    axios.post('/auth/login', user)
      .then((response) => {
        axios.defaults.headers.common.Authorization = response.data.token;
        TokenManager.setToken(response.data.token)
          .then(() => TokenManager.getTokenPayload())
          .then(() => navigate('AddJourney'));
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
    const { navigation: { navigate } } = this.props;

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
        <Link text="or sign up" onPress={() => navigate('SignUp')} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </Container>
    );
  }
}

export default Login;
