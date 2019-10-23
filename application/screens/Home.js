import React, { Component } from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class Home extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.texto}>BIENVENIDO, PANTALLA DE ESCRITORIO.</Text>
                <TouchableOpacity style = {styles.button2} onPress={() => Actions.pop()}>
                    <Text style={[styles.regText]}>Volver a Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 17,
      
    },
    texto:{
        fontSize:20,
        fontWeight:'bold',
        justifyContent:'center'
    },
    button2: {
        alignItems: 'center',
        marginTop:20,
        padding: 7
      },
    
    regText: {
        color: 'blue'
    }
});