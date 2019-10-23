import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Button,TouchableOpacity,Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import AwesomeAlert from 'react-native-awesome-alerts';
import t from 'tcomb-form-native';
const Form = t.form.Form;

//BASE DE DATOS FIREBASE - CONEXIÓN
import firebase from 'firebase'
import '@firebase/firestore';

// Initialize Firebase
// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyBnqPhjPMeIZ3bDb2cIIZcJTVt6oSyt0_Y",
  authDomain: "ssg-music-app.firebaseapp.com",
  databaseURL: "https://ssg-music-app.firebaseio.com",
  projectId: "ssg-music-app",
  storageBucket: "ssg-music-app.appspot.com",
  messagingSenderId: "971755773718",
  appId: "1:971755773718:web:78fc507fef6bbf43d4ba37",
  measurementId: "G-5GLM09ZNG6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const User = t.struct({
  usuario: t.String,
  clave: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 20,
    },
  },
};

const options = {
  order: ['usuario', 'clave'],
  fields: {
    usuario: {
      error:'.',
      placeholder: 'Digite su usuario',
    },
    clave: {
      error:'.',
      placeholder: 'Digite su contraseña',
      password: true,
      secureTextEntry: true,
    },
  },
  stylesheet: formStyles,
};

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showAlert: false,
      titleMessage: '',
      messageAlert:'' 
    };
  };
  
  activo = () => {
    Actions.home()
  }

  inactivo = () => {
    this.setState({
      showAlert: true,
      titleMessage: '¡ALERTA!',
      messageAlert: 'LO SENTIMOS, SU USUARIO NO SE ENCUENTRA ACTIVO.'
    });
  }

  pendiente = () => {
    this.setState({
      showAlert: true,
      titleMessage: '¡ALERTA!',
      messageAlert: 'LO SENTIMOS, EL USUARIO AÚN NO HA SIDO APROBADO.'
    });
  }

  invalidos = () => {
    this.setState({
      showAlert: true,
      titleMessage: '¡ALERTA!',
      messageAlert: 'LO SENTIMOS, LAS CREDENCIALES NO SON CORRECTAS. INTENTE DE NUEVO POR FAVOR.'
    });
  }

  validationLogin = () => {//Validar entrada de datos
    let $this = this;
    const value = this._form.getValue();

    if(value!=null){//Validar datos en firebase
      db.collection("usuarios").where("usuario", "==", value.usuario).where("clave","==",value.clave)
      .onSnapshot(function(querySnapshot) {
        var estado = "";
        querySnapshot.forEach(function(doc) {
            estado = doc.data().estado;
        });

        if(estado=="ACTIVO"){
          $this.activo()
        }else if(estado=="INACTIVO"){
          $this.inactivo()
        }else if(estado=="PENDIENTE"){
          $this.pendiente()
        }else{
          $this.invalidos()
        } 
      });
    }else{//Mostrar alertas
      this.setState({
        showAlert: true,
        titleMessage: '¡CAMPOS REQUERIDOS!',
        messageAlert: 'POR FAVOR, INGRESE SUS DATOS PARA PODER INGRESAR.'
      });
    }
  };

  render() {
    const {showAlert,titleMessage,messageAlert} = this.state;

    return (
      <ImageBackground source={require('../../assets/images/bg-login.png')} style={{width: '100%', height: '100%'}}>
        <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} keyboardShouldPersistTaps='handled'>
          <View style={styles.container}>
            <Form ref={c => (this._form = c)} type={User} options={options}/>
            <Button title="INICIAR SESIÓN" style={styles.buttonStyle} onPress={this.validationLogin} />
            <TouchableOpacity style = {styles.button} onPress={() => Actions.register()}>
              <Text style={[styles.regText]}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button2} onPress={() => Actions.password()}>
              <Text style={[styles.regText]}>¿Olvidó Su Contraseña?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={titleMessage}
          message={messageAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="ACEPTAR"
          confirmButtonColor="#48BBEC"
          onConfirmPressed={() => {
            this.setState({
              showAlert: false,
            });
          }}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 210,
    padding: 17,
  },

  buttonStyle:{
    marginTop: 25,
    color:'#395065'
  },

  button: {
    alignItems: 'center',
    marginTop:15,
    padding: 7
  },

  button2: {
    alignItems: 'center',
    marginTop:10,
    padding: 7
  },

  regText: {
    color: 'blue'
  }
});
