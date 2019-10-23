import React, { Component } from 'react';
import { StyleSheet,View, Button} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import AwesomeAlert from 'react-native-awesome-alerts';
import t from 'tcomb-form-native';
const Form = t.form.Form;

//BASE DE DATOS FIREBASE - CONEXIÓN
import firebase from 'firebase'
import '@firebase/firestore';

const db = firebase.firestore();

const Genero = t.enums({
  M: 'Masculino',
  F: 'Femenino'
});

const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});

const Phone = t.subtype(t.String, (phone) => {
    const reg = /^\d{4}-\d{4}$/;
    return reg.test(phone);
});

const DateUser = t.struct({
    nombres: t.String,
    apellidos: t.String,
    email: Email,
    fechaNacimiento:t.Date,
    genero: Genero,
    telefono: Phone,
    usuario:t.String,
    clave: t.String,
    confClave: t.String
});

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {
        marginBottom: 20,
      },
    },
  
    controlLabel: {
      //APLICAR PARA CUANDO NO HAY ERRORES
      normal: {
        color: 'black',
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '600',
      },
  
      //APLICAR PARA ERRORES
      error: {
        color: 'red',
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '600',
      },
    },
};

const options = {
    fields: {
      nombres: {
        placeholder: 'Digite sus Nombres',
        //error: 'Por favor, ingrese sus Nombres.',
        error:'.'
      },
      apellidos: {
        placeholder: 'Digite sus Apellidos',
        //error: 'Por favor, ingrese sus Apellidos.'
        error:'.'
      },
      email: {
        label: 'Correo Electrónico',
        placeholder: 'Digite su Correo Electrónico',
        //error: 'Por favor, ingrese un Correo Electrónico válido.'
        error:'.'
      },
      genero: {
        label: 'Género',
        placeholder: 'Seleccione su género',
        //error: 'Por favor, seleccione su Género.'
        error:'.'
      },
      fechaNacimiento: {
        label:'Fecha de Nacimiento',
        mode:'date',
        //error: 'Por favor, seleccione su fecha de nacimiento.',
        error:'.'
      },
      telefono: {
        label:'Teléfono',
        placeholder:'Digite su teléfono',
        //error: 'Por favor, ingrese un número de teléfono válido (0000-0000)',
        error:'.'
      },
      usuario: {
        placeholder: 'Digite su Usuario',
        //error: 'Por favor, ingrese sus Nombres.',
        error:'.'
      },
      clave:{
        label:'Contraseña',
        error:'.',
        placeholder: 'Digite su contraseña',
        password: true,
        secureTextEntry: true,
      },
      confClave:{
        label: 'Confirme su contraseña',
        error:'.',
        placeholder: 'Confirme su contraseña',
        password: true,
        secureTextEntry: true,
      },
    },
    stylesheet: formStyles,
};

export default class Register extends Component{
    constructor(props) {
      super(props);
      this.state = { 
        showAlert: false,
        titleMessage: '',
        messageAlert:'' 
      };
    };
    


    existeReg = () => {
      this.setState({
        showAlert: true,
        titleMessage: '¡ALERTA!',
        messageAlert: 'LO SENTIMOS. EL CORREO INGRESADO, YA HA SIDO REGISTRADO.'
      });
    }

    validarRegistro = () => {
      let $this = this;
      const value = this._form.getValue();

      if(value!=null){//Validar datos en firebase
        if(value.usuario.lenght<4){
          this.setState({
            showAlert: true,
            titleMessage: '¡CAMPOS REQUERIDOS!',
            messageAlert: 'POR FAVOR, INGRESE UN USUARIO CON CUATRO CARACTERES COMO MÍNIMO.'
          }); 
        }else if(value.clave.lenght<4){
          this.setState({
            showAlert: true,
            titleMessage: '¡CAMPOS REQUERIDOS!',
            messageAlert: 'POR FAVOR, INGRESE UNA CONTRASEÑA MAYOR A CUATRO CARACTERES COMO MÍNIMO.'
          }); 
        }else if(value.clave!=value.confClave){
          this.setState({
            showAlert: true,
            titleMessage: '¡CAMPOS REQUERIDOS!',
            messageAlert: 'LO SENTIMOS, LAS CONTRASEÑAS NO COINCIDEN. INTENTE DE NUEVO'
          }); 
        }else{
          db.collection("usuarios").where("correo", "==", value.email)
          .onSnapshot(function(querySnapshot) {
            var estado = "";
            querySnapshot.forEach(function(doc) {
                estado = doc.data().estado;
            });
    
            if(estado==""){
              // Add
              db.collection("usuarios").add({
                nombre: value.nombres,
                papellido: value.apellidos,
                sapellido: value.apellidos,
                telefono: value.telefono,
                correo: value.email,
                genero: value.genero,
                edad: value.fechaNacimiento,
                estado: 'PENDIENTE',
                usuario: value.usuario,
                clave: value.usuario,
              })
              .then(function(docRef) {
                $this.setState({
                  showAlert: true,
                  titleMessage: '¡ALERTA!',
                  messageAlert: 'EL REGISTRO SE HA ENVIADO CON ÉXITO. SE LE NOTIFICARÁ POR CORREO, CUANDO TENGA ACCESO A LA APP.'
                });
              })
              .catch(function(error) {
                alert("Error adding document: ", error);
              });
            }else{
              $this.existeReg()
            }
          });
        }
      }else{//Mostrar alertas
        this.setState({
          showAlert: true,
          titleMessage: '¡CAMPOS REQUERIDOS!',
          messageAlert: 'POR FAVOR, COMPLETE EL FORMULARIO PARA  PODER REGISTRARSE. TODOS LOS CAMPOS SON REQUERIDOS.'
        });
      }
    };

    render(){
      const {showAlert,titleMessage,messageAlert} = this.state;
      return(
          <>
          <KeyboardAwareScrollView extraScrollHeight={200} enableOnAndroid={true} keyboardShouldPersistTaps='handled'> 
            <View style={styles.inner}>
              <Form ref={c => (this._form = c)} type={DateUser} options={options} />
              <Button title="GUARDAR DATOS" style={styles.buttonStyle} onPress={this.validarRegistro} />
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
          </>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 0,
      padding: 17,
      
    },
  
    buttonStyle:{
      marginTop: 25,
      color:'#395065'
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: "flex-end",
    },
});

