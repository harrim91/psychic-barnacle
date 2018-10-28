import React from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Contacts, Permissions } from 'expo';
import {
  Container, Header, Content, Form, Icon, Picker, Textarea, Button
} from 'native-base';
import TokenManager from '../../lib/token-manager'

class LovedOnes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContact1: 'not-selected-na',
      selectedContact2: 'not-selected-na',
      selectedContact3: 'not-selected-na',
      message: `Train is delayed. I'll be late.`
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    const selectedContact1 = await TokenManager.getData('selectedContact1');
    const selectedContact2 = await TokenManager.getData('selectedContact2');
    const selectedContact3 = await TokenManager.getData('selectedContact3');
    const message = await TokenManager.getData('message');

    // restore from async store or use default values from state
    this.setState({
      selectedContact1: selectedContact1 || this.state.selectedContact1,
      selectedContact2: selectedContact2 || this.state.selectedContact2 ,
      selectedContact3:  selectedContact3 || this.state.selectedContact3,
      message: message || this.state.message
    })

    if (status === 'granted') {
      const contacts = await Contacts.getContactsAsync();
      this.setState({ contacts: contacts.data.filter(c => c.phoneNumbers) });
    } else {
      this.setState({permissons: 'Please give contact permissions to app.'})
    }
  }

  handleContactSelect = person => contactId => {
    this.setState({[person]: contactId})
  }

  setMessage = message => {
    this.setState({message})
  }

  saveToStorage = async () => {
    const {
      selectedContact1,
      selectedContact2,
      selectedContact3,
      message
    } = this.state;
    await TokenManager.saveData('selectedContact1', selectedContact1);
    await TokenManager.saveData('selectedContact2', selectedContact2);
    await TokenManager.saveData('selectedContact3', selectedContact3);
    await TokenManager.saveData('message', message);
  }

  render() {
    const { selectedContact1, selectedContact2, selectedContact3, contacts} = this.state;

    return (
      <Container>
        <Header><Text style={{flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 25, color: '#fff', padding: 10}}>Notify Loved Ones</Text></Header>
        <Content>
          <Form>
            <Text style={{padding: 10, fontSize: 15}}>Select up to 3 contacts whom you would like to send an automatic SMS when your planned train journeys are running late.</Text>
            <Picker
              mode="dropdown"
              iosIcon={<Ionicons name="ios-arrow-down" />}
              placeholder="Select your first contact"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={selectedContact1}
              onValueChange={this.handleContactSelect('selectedContact1')}
            >
              <Picker.Item key="nope" label="Not selected" value="not-selected-na" />
              {contacts.map(c => {
                return (<Picker.Item key={c.id} label={c.name} value={c.id} />)
              })}
            </Picker>
            <Picker
              mode="dropdown"
              iosIcon={<Ionicons name="ios-arrow-down" />}
              placeholder="Select your second contact"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={selectedContact2}
              onValueChange={this.handleContactSelect('selectedContact2')}
            >
              <Picker.Item key="nope" label="Not selected" value="not-selected-na" />
              {contacts.map(c => {
                return (<Picker.Item key={c.id} label={c.name} value={c.id} />)
              })}
            </Picker>
            <Picker
              mode="dropdown"
              iosIcon={<Ionicons name="ios-arrow-down" />}
              placeholder="Select your third contact"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={selectedContact3}
              onValueChange={this.handleContactSelect('selectedContact3')}
            >
              <Picker.Item key="nope" label="Not selected" value="not-selected-na" />
              {contacts.map(c => {
                return (<Picker.Item key={c.id} label={c.name} value={c.id} />)
              })}
            </Picker>
            <Textarea rowSpan={3} bordered placeholder="Train is delayed. I'll be late." onValueChange={this.setMessage} />
            <Button full onPress={this.saveToStorage}><Text style={{color: '#fff'}}>Save</Text></Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default LovedOnes;
