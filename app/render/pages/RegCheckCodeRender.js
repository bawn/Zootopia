/*
 * 验证验证码
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

export default class RegCheckCodeRender extends Component {
  constructor(propos) {
    super(propos)
    this.state = {
      code:null,
      buttonEnabled: true
    };
  }

  _checkButtonAction(){
    const parameters = 'number=' + this.props.phoneNumber + '&identity=' + this.state.code
    fetch('http://api.xinpinget.com' + '/user/phone/verifyIdentity', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: parameters
    })
      .then((response) => response.json())
      .then((json) => {
        Actions.inputProfile({userInfo:json.result})
      })
    .done();

    // Actions.inputProfile()
  }

  _onChangeText(text) {
    if (text.length === 4) {
      this.setState({
        code: text,
        buttonEnabled: true
      })
    }
    else {
      this.setState({
        code: text,
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
            {/* <Image source={require('../../assets/grey_code_icon.png')}
              style={{width:24, height:24}}
            /> */}
            <CodeTextField
              onChangeText={(text) => this._onChangeText(text)}
            />
          </View>
          <NextButton
            onPress={()=>this._checkButtonAction()}
            enabled={this.state.buttonEnabled}>
          </NextButton>
      </View>
      </View>
    );
  }
}

const locaclStyles = {
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7, marginRight: 7,
    // backgroundColor: MKColor.Lime,
  },
  horizontalView: {
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
  }
}
