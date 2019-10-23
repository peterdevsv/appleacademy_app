import React, {Component} from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';

const {height} = Dimensions.get('window');

export default class PreLoader extends Component{
    render(){
        return(
            <View style={[styles.preolader]}>
                <ActivityIndicator
                    style={{height: 80}}
                    size="large"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    preolader:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        backgroundColor: '#242935'
    }
});