import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Button,TouchableOpacity,Text } from 'react-native';
import { Actions } from 'react-native-router-flux'
import t from 'tcomb-form-native';
const Form = t.form.Form;

const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});

const DatePass = t.struct({
    email: Email,
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
      email: {
        label: 'Correo Electrónico',
        placeholder: 'Digite su Correo Electrónico',
        //error: 'Por favor, ingrese su Correo Electrónico.'
      },
    },
    stylesheet: formStyles,
};

export default class Password extends Component{
    handleSubmit = () => {
        const value = this._form.getValue();
        if(value!=null){
        alert(value)}
    };

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.formulario}>Para recuperar su contraseña, por favor digite su correo electrónico a continuación.</Text>
                <Form ref={c => (this._form = c)} type={DatePass} options={options}/>
                <Button title="ENVIAR" style={styles.buttonStyle} onPress={this.handleSubmit} />
            </View>
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

    formulario:{
        marginBottom: 30
    }
});