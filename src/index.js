import React from 'react';
import { Text } from 'react-native';
import { Container } from './components';
import Auth from './auth';

class App extends React.Component {
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
      <Container>
        <Text>Hello {user.firstName}</Text>
      </Container>
    );
  }
}

export default App;
