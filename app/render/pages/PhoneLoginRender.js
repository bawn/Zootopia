/*
 * 手机号登录
 */

 import React, {
   Component,
 } from 'react'

import {
  Text,
  View,
  Image,
  Platform,
  BackAndroid,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import RedButton from '../compents/RedButton'
import NavBar from '../compents/NavbarRender'
import Styles from '../other/Styles'
import realm from '../../models/realm'
import BottomLineView from '../compents/BottomLineView'
import TopLineView from '../compents/TopLineView'

const ScreenWidth = (Dimensions.get('window').width)

export default class PhoneLoginRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: null,
      password: null,
    };
  }
  _loginButtonAction() {
    // const parameters = 'number=' + this.state.phoneNumber + '&password=' + this.state.password;
    const parameters = 'number=' + '18668152051' + '&password=' + '123456';

    fetch('http://api.xinpinget.com' + '/user/phone/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: parameters
    })
      .then((response) => response.json())
      .then((json) => {
        // 保存或者更新 user
        realm.write(() => {
          realm.create('User', {
            user: json.result.user,
            _id: json.result._id,
            created: json.result.created,
            token: json.result.token,
          },true);
        });
        Actions.tabbar();
      })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar title={this.props.title}/>
        <View style={[styles.contentView, {marginTop: 20}]}>
          <TopLineView/>
          <BottomLineView/>
          <TextInput
            value={this.props.phone}
            style={styles.textfield}
            placeholder={'手机号'}
            underlineColorAndroid={'transparent'}
            clearButtonMode={'while-editing'}
            />
        </View>
        <View style={styles.contentView}>
          <BottomLineView/>
          <TextInput
          style={styles.textfield}
          placeholder={'密码'}
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
          clearButtonMode={'while-editing'}
          />
        </View>
        <View style={styles.otherView}>
          <TouchableOpacity>
            <Text style={styles.forgot}>{'忘记密码?'}</Text>
          </TouchableOpacity>
          <RedButton text={'登录'} style={styles.loginButton} onPress={()=>this._loginButtonAction()}></RedButton>
        </View>
      </View>
    )
  }
}


const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F3F5F6',
  },
  textfield: {
    flex:1,
    marginLeft: (Platform.OS === 'ios') ? 16 : 0,
    fontSize: 14,
  },
  contentView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 49,
  },
  otherView: {
    flex: 1,
    alignItems: 'center',
  },
  forgot: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    color: 'rgba(171,171,171,1)'
  },
  loginButton: {
    marginTop: 30,
    width: ScreenWidth - 32,
    // marginLeft: 16,
    // marginRight: 16
  }
}
