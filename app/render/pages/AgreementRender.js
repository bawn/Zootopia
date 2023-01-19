/*
 * 隐私和协议
 */

import React, {
  Component,
} from 'react'

import {
  WebView,
  View,
  requireNativeComponent,
  Platform
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import NavBar from '../compents/NavbarRender'
import Styles from '../other/Styles'
import WKWebView from '../compents/WKWebView'

export default class AgreementRender extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={Styles.container}>
        <NavBar title={this.props.title} leftAction={()=>{Actions.pop()}}/>
        {this._webView()}
      </View>
    )
  }
  _webView(){
    if (Platform.OS === 'ios') {
      return <WKWebView source={require('../../assets/userPrivacy.html')} style={{flex: 1}}/>
    }
    else {
      return(
          <WebView
            style={{flex:1}}
            automaticallyAdjustContentInsets={false}
            source={require('../../assets/userPrivacy.html')}
            startInLoadingState={true}
          />
        )
      }
    }
  }
