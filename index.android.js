/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class GoogleAuthTutorial extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this._setupGoogleSignin()
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{width:120, height: 44}}
            color={GoogleSigninButton.Color.Light}
            size={GoogleSigninButton.Size.Icon}
            onPress={() => {
              this.googleAuth()
            }}
          />
        </View>
      );
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            marginBottom: 20
          }}> Welcome {this.state.user.name}
          </Text>
        </View>
      )
    }
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayService({
        autoResolve: true
      })
      await GoogleSignin.configure({
        webClientId: '291635963799-gto2t1h7b205p0gq31f6d6j2af7o0iv9.apps.googleusercontent.com'
      })

      const user = await GoogleSignin.currentUserAsync()
      console.log(user)
      this.setState({user: user})
    } catch (error) {
      console.log("Play Service Error", error.code)
    }
  }

  _googleAuth() {
    GoogleSignin.signIn().then((user) => {
      console.log(user)
      this.setState({user: user})
    }).catch((error) => {
      console.log('Failed Signing', error)
    }).done()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('GoogleAuthTutorial', () => GoogleAuthTutorial);
