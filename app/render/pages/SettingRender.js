/*
 * 设置
 */

 import React, {
   Component,
 } from 'react'

import {
  Text,
  View,
  Image,
  Alert,
  NativeModules,
  TouchableHighlight
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import realm from '../../models/realm'
import Styles from '../other/Styles'
import NavBar from '../compents/NavbarRender'
import {getToken} from '../../models/User'
import BottomLineView from '../compents/BottomLineView'
import TopLineView from '../compents/TopLineView'

const CacheSize = NativeModules.CacheSize;

export default class SettingRender extends Component {
  constructor(props) {
    super(props);
  }

  _logout(){
    fetch('http://api.xinpinget.com' + '/user/logout' + '?token=' +getToken(), {
      method: 'post',
    })
      .then((response) => response.json())
      .then((json) => {
        realm.write(() => {
          let user = realm.objects('User');
          realm.delete(user);
        });
        Actions.login();
      })
    .done();
  }

  logoutAction(){
    Alert.alert(
      '是否退出登录',
      null,
      [
        {text: '确定', onPress: () => this._logout()},
        {text: '取消'},
      ]
    )
  }

  onlineServiceAction(){
    const token = getToken();
    let uri = 'http://chat.xinpinget.com/feedback?token='+token;

    Actions.webView({uri:uri, title: '在线客服'})
  }


  render() {
    return(
      <View style={styles.container}>
        <NavBar title={this.props.title} leftAction={()=>{Actions.pop()}}/>
        <View style={[styles.row, {marginTop: 18, marginBottom: 18}]}>
          <TopLineView/>
          <View style={styles.horizontalView}>
            <Image
              source={require('../../assets/iconCleanCache.png')}
              style={styles.image}
            />
            <Text style={Styles.LBRText}>{'清理缓存'}</Text>
          </View>
          <BottomLineView/>
        </View>
        <View style={styles.row}>
          <TopLineView/>
          <View style={styles.horizontalView}>
            <Image
              source={require('../../assets/iconSettingScore.png')}
              style={styles.image}
            />
            <Text style={Styles.LBRText}>{'鼓励一下'}</Text>
          </View>
          <Image
            source={require('../../assets/iconDisclosureIndicator.png')}
            style={{marginRight:10}}
          />
          <BottomLineView style={{marginLeft: 16}}></BottomLineView>
        </View>
        <TouchableHighlight onPress={()=>Actions.agreement()}>
          <View style={styles.row}>
            <View style={styles.horizontalView}>
              <Image
                source={require('../../assets/iconSettingPrivacy.png')}
                style={styles.image}
              />
              <Text style={Styles.LBRText}>{'隐私和协议'}</Text>
            </View>
            <Image
              source={require('../../assets/iconDisclosureIndicator.png')}
              style={{marginRight:10}}
            />
            <BottomLineView style={{marginLeft: 16}}></BottomLineView>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>this.onlineServiceAction()}>
          <View style={styles.row}>
            <View style={styles.horizontalView}>
              <Image
                source={require('../../assets/iconSettingSuggest.png')}
                style={styles.image}
              />
              <Text style={Styles.LBRText}>{'反馈问题或意见'}</Text>
            </View>
            <Image
              source={require('../../assets/iconDisclosureIndicator.png')}
              style={{marginRight:10}}
            />
            <BottomLineView></BottomLineView>
          </View>
        </TouchableHighlight>
        <View style={{height: 16, backgroundColor: 'rgba(244,244,244,1)'}}/>
        <TouchableHighlight onPress={()=>this.logoutAction()}>
        <View style={styles.row}>
          <TopLineView/>
          <View style={styles.horizontalView}>
            <Image
              source={require('../../assets/iconSettingSignOut.png')}
              style={styles.image}
            />
            <Text style={Styles.LBRText}>{'退出登录'}</Text>
          </View>
          <BottomLineView/>
        </View>
        </TouchableHighlight>
      </View>
    )
  }
}


const styles = {
  row: {
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  image: {
    marginRight: 16,
    marginLeft: 16
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)'
  },
  horizontalView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
}
