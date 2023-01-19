/*
 *
 */

import React, {
  Component
} from 'react'

import {
  requireNativeComponent,
  WebView,
  View,
  Platform
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import NavBar from '../compents/NavbarRender'
import WKWebView from '../compents/WKWebView'

export default class WebViewRender extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
        <NavBar title={this.props.title} leftAction={()=>{Actions.pop()}}/>
        {this._webView()}
      </View>
    )
  }
  _webView(){
    if (Platform.OS === 'ios') {
      return (
        <WKWebView source={{uri: this.props.uri}} style={{flex: 1}}/>
      )
    }
    else {
      return(
          <WebView
            style={{flex:1}}
            automaticallyAdjustContentInsets={false}
            source={{uri:this.props.uri}}
            startInLoadingState={true}
          />
        )
      }
    }
}
