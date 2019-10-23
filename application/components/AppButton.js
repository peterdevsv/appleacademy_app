import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';

export default class AppButton extends Component{
    render(){

         const {action, iconName, iconColor, title,typeButton,iconSize} = this.props;
         const {width} = Dimensions.get('window');

        return(
            <Button
                onPres={action}
                buttonStyle={{
                    height: 45,
                    borderColor: "transparents",
                    borderWidth: 0,
                    borderRadius: 5,
                    marginBottom: 5,
                    width: width
                }}
                title={title}
                icon={
                    <Icon
                        name={iconName}
                        size={iconSize}
                        color={iconColor}
                    />
                }
                text={title}
                iconRight={true}
                type={typeButton}
            >
            </Button>
        )
    }
}
