/*
 * 手机号注册
 */

 import React, {
   Component,
 } from 'react'

import {
  Text,
  View,
  Image,
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import NavBar from '../compents/NavbarRender'
import Styles from '../other/Styles'


const locaclStyles = {
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7, marginRight: 7,
    // backgroundColor: MKColor.Lime,
  },
  textfield: {
    flex:1,
    height: 38,
    marginRight: 24,
    marginLeft: 16,
    marginBottom: 8
  },
  horizontalView: {
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
  }
}


export default class RegPhoneRender extends Component {
  constructor(propos) {
    super(propos)
    this.state = {
      phoneNumber: null,
      buttonEnabled: true
    };
  }


  _regButtonAction(){
    const parameters = 'number=' + this.state.phoneNumber + '&mockIdentity=' + '1234'
    fetch('http://api.xinpinget.com' + '/user/phone/getIdentity', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: parameters
    })
      .then((response) => response.json())
      .then((json) => {
        Actions.regCheckCode({phoneNumber: this.state.phoneNumber})
      })
    .done();

    // Actions.regCheckCode({phoneNumber: this.state.phoneNumber})
  }

  _onChangeText(text){
    if (text.length === 11) {
      this.setState({
        phoneNumber: text,
        buttonEnabled: true
      })
    }
    else {
      this.setState({
        phoneNumber: text,
        buttonEnabled: false
      })
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <View>
          <NavBar title={this.props.title} leftAction={Actions.pop}/>
          <View style={[locaclStyles.horizontalView, {marginTop: 20}]}>

            <PhoneTextField
              onChangeText={(text) => this._onChangeText(text)}
            />
          </View>
          <RegButton
            onPress={()=>this._regButtonAction()}
            enabled={this.state.buttonEnabled}>
          </RegButton>
        </View>
      </View>
    );
  }
}
