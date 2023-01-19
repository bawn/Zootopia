import React, {
  Component,
} from 'react'

import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  Platform
} from 'react-native'

import {
  Actions,
} from 'react-native-router-flux'


import NavBar from '../../compents/NavbarRender'
import Styles from '../../other/Styles'
import * as Colors from '../../other/Colors'

import * as Url from '../../other/UrlCons'
import * as ImageUrl from '../../../tool/ImageUrlSize'
import Toast from 'react-native-root-toast'
import Spinner from '../../compents/LoadingRender'
import EmptyRender from '../../compents/EmptyRender'
import {getToken} from '../../../models/User'


export default class LogisticsIssueRender extends Component {
  constructor(props) {
    super(props);
    this.state ={
      visible: false,
      contact : '',
      info : '',
      rightButtonDisable: true,
    }
  }

  _onContactChangeText(text) {
    this.setState({
      contact: text,
    }, ()=> {
      var disable = this._rightButtonDisable();
      this.setState({
        rightButtonDisable: disable
      })
    });

    this.setState({
      contact: text
    });
  }

  _onInfoChangeText(text) {

    this.setState({
      info: text,
    }, () => {
      var disable = this._rightButtonDisable();
      this.setState({
        rightButtonDisable: disable
      })
    });
  }

  _rightButtonDisable(){
    var disable = true;
    if (this.props.bindPhone) {
      disable = (this.state.info.length === 0)
    }
    else {
      disable = !(this.state.info.length !== 0 && this.state.info.length !== 0);
    }
    return disable;
  }

  render() {
    return(
      <View style={styles.container}>
        <NavBar title={this.props.title}
          rightTitle={'提交'}
          type={'text'}
          rightAction={()=> {this._confirmButtonAction()}}
          rightButtonDisable={this.state.rightButtonDisable}
        />
        <View style={[Styles.spaceVView, {backgroundColor: Colors.placeholderColor}]}>
          <View>
            <View style={{height: this.props.bindPhone ? 0 : 49 + 16}}>
              <View style={[Styles.topBottomLine, {height: 49, marginTop: 16}]}>
                <TextInput
                  placeholder={'请输入您的手机号／邮箱'}
                  underlineColorAndroid={'transparent'}
                  clearButtonMode={'while-editing'}
                  onChangeText={(text) => this._onContactChangeText(text)}
                  style={styles.textInput}
                  placeholderTextColor={'#ababab'}
                  autoFocus={this.props.bindPhone ? false : true}
                >
                </TextInput>
              </View>
            </View>
            <View style={[Styles.topBottomLine, styles.textView]}>
              <TextInput
                placeholder={'请详细描述您的订单问题...'}
                underlineColorAndroid={'transparent'}
                clearButtonMode={'while-editing'}
                multiline={true}
                placeholderTextColor={'#ababab'}
                autoFocus={this.props.bindPhone ? true : false}
                onChangeText={(text) => this._onInfoChangeText(text)}
                style={[styles.textInput, {textAlignVertical: 'top'}]}>
              </TextInput>
            </View>
          </View>

        </View>
        <Spinner
          visible={this.state.visible}
          size='small'
          color={Colors.grayColor}
          overlayColor='transparent'
        />
      </View>
    )
  }

  _confirmButtonAction(){
    this.setState({
      visible: true
    });
    var json = {
      'contact' : this.state.contact,
      'content' : this.state.info
    };

    fetch(Url.issueOrder() + this.props._id + '?token=' + getToken(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json),
    })
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        visible: !this.state.visible
      });
      Toast.show(' 提交成功！', {
        duration: 200,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onHidden: () => {
          Actions.pop();
        }
      });
    })
    .catch((error) =>{
      this.setState({
        visible: !this.state.visible
      });
    })
    .done();
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.placeholderColor,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.blackColor,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
  },
  textView: {
    height: 225,
    marginTop: 16,
    paddingTop: 8,
    backgroundColor: 'white'
  },
  button: {
    marginLeft: 0,
    marginRight: 0
  },
}
