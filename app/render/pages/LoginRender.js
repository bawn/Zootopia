/*
 * 登录首页
 */

 import React, {
  Component,
} from 'react'

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import RedButton from '../compents/RedButton'

export default class LoignRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      buttonDisabled: true
    }
  }

  _nextButtonAction(){
    Actions.phoneLogin({phone:this.state.phone});
  }
  _onChangeText(text) {
    this.setState({
      phone: text,
      buttonDisabled: text.length !== 11
    })
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Image
          source={require('../../assets/bgBitmap.png')}
          style={styles.headerImage}
          resizeMode="stretch"
          >
          <Text style={styles.title}>{'登录'}</Text>
          <Text style={styles.subtitle}>{'登  录  后  继  续  浏  览'}</Text>
        </Image>
        <View style={styles.borderView}>
          <TextInput
            placeholder={'手机号快速登录'}
            maxLength={11}
            underlineColorAndroid={'transparent'}
            clearButtonMode={'while-editing'}
            onChangeText={(text) => this._onChangeText(text)}
            style={styles.textInput}>
          </TextInput>
        </View>
        <RedButton
          text={'下一步'}
          style={styles.redButton}
          onPress={()=>this._nextButtonAction()}
          disabled={this.state.buttonDisabled}
          >
        </RedButton>
      </View>
    );
  }
}

const styles = {
  borderView: {
    borderRadius: 4,
    borderColor: 'rgb(230,230,230)',
    height: 49,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 25,
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16
  },
  textInput: {
    fontSize: 14,
    flex:1,
    marginLeft: (Platform.OS === 'ios') ? 16 : 0,
  },
  redButton: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 25
  },
  title: {
    fontSize: 21,
    fontWeight: '600',
    color: 'black'
  },
  headerImage:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
    width: Dimensions.get('window').width
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '100',
    color: 'black',
    marginTop: 20,
    backgroundColor: 'transparent'
  }
}
