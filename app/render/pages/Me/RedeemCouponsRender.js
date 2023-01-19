/*
 * 兑换优惠券
 */

import React, {
  Component,
} from 'react'

import {
  WebView,
  View,
  Platform,
  TextInput,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'


import RedButton from '../../compents/RedButton'
import NavBar from '../../compents/NavbarRender'
import Styles from '../../other/Styles'
import * as Colors from '../../other/Colors'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import DismissKeyboard from 'dismissKeyboard'



const tipString = '优惠券已存入你的账户中，下单的时候可直接抵扣';
const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

export default class RedeemCouponsRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      // dialogOpen: false,
    };
  }
  _onChangeText(text) {
    this.setState({
      buttonDisabled: text.length === 0
    })
  }

  _nextButtonAction(){
    DismissKeyboard()
    this.popupDialog.openDialog();
  }
  render() {
    return(
      <View style={Styles.container}>
        <NavBar title={this.props.title} leftAction={()=>{Actions.pop()}}/>
        <View style={styles.borderView}>
          <TextInput
            placeholder={'输入火球暗号'}
            underlineColorAndroid={'transparent'}
            clearButtonMode={'while-editing'}
            onChangeText={(text) => this._onChangeText(text)}
            style={styles.textInput}>
          </TextInput>
        </View>
        <RedButton
          text={'兑换'}
          style={styles.redButton}
          onPress={()=>this._nextButtonAction()}
          disabled={this.state.buttonDisabled}
          >
        </RedButton>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog;}}
          width={Dimensions.get('window').width - 32}
          height={417}
          haveTitleBar={false}
          dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
          onClosed={()=>{Actions.pop()}}
          >
            {this._popupView()}
          </PopupDialog>
      </View>
    )
  }
  _popupView(){
    return(
      <View style={styles.container}>
        <View style={styles.redView}>
          <Image source={require('../../../assets/iconRedeemSuccess.png')} style={{marginTop: 40}}/>
          <View style={styles.price}>
            <Text style={{fontSize:50, color: 'white'}}>{'10.00'}</Text>
            <Text style={{fontSize: 14, color: 'white', marginBottom: 12, marginLeft: 4}}>元</Text>
          </View>
          <Text style={{fontSize: 12, color: 'rgba(255,255,255,0.5)'}}>{tipString}</Text>
        </View>
        <TouchableOpacity
          onPress={()=>{this.popupDialog.closeDialog()}}
          style={[{flex: 54}, Styles.centerView]}>
            <Text style={{fontSize: 16}}>好的</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1
  },
  borderView: {
    backgroundColor: 'white',
    borderColor: 'rgba(230,230,230,1)',
    height: 49,
    borderWidth: 0.5,
    marginTop: 20,
    justifyContent: 'center',
    paddingRight: 16
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
  price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
    marginTop: 16
  },
  redView: {
    flex: 363,
    // backgroundColor: Colors.redColor,
    alignItems: 'center',
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  }
}
