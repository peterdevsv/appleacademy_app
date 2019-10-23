import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

//PANTALLAS
import Start from './application/screens/Start';
import Register from './application/screens/Register';
import Password from './application/screens/Password';
import Home from './application/screens/Home';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login"
            component={Start}
            title="¡Bienvenido!"
            initial
          />
          <Scene key="register"
            component={Register}
            title="Registrarse"
          />
          <Scene key="password"
            component={Password}
            title="Recuperar Contraseña"
          />
          <Scene key="home"
            component={Home}
            title="ESCRITORIO"
          />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('appleacademy_app', () => App);
