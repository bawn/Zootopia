/*
 * 我的订阅
 */
import React, {
  Component,
} from 'react'

import {
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import Styles from '../../other/Styles'
import {getToken} from '../../../models/User'
import NavBar from '../../compents/NavbarRender'
import * as Colors from '../../other/Colors'
import SubscribeButton from '../../compents/SubscribeButton'
import BottomLineView from '../../compents/BottomLineView'
import ActionSheet from 'react-native-actionsheet'
import * as imageUrlSize from '../../other/ImageUrlSize'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
const buttons = [
    '取消', '停止关注',
];

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

export default class MySubscribeRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      currentChannelId: ''
    };
  }
  _handlePress(index) {
    if (index === 1) {
      this._unsubscribeChannel().then((data) =>{
        this._updateData();
        RCTDeviceEventEmitter.emit('updateHome');
      });
    }
  }
  _unsubscribeChannel() {
    let channelId = this.state.currentChannelId;
    let token = getToken();
    return new Promise((resolve, reject) => {
      fetch('http://api.xinpinget.com' +'/channel/unsubscribe/' + channelId+ '?token=' + token, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData) {
            resolve(responseData);
          }
        })
        .done();
    });
  }

  componentDidMount(){
    this._updateData();
  }
  _updateData(){
    fetch('http://api.xinpinget.com' + '/user/channels' + '?token=' + getToken())
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.result),
          });
        }
      })
      .done();
  }

  render() {
    return(
      <View style={Styles.container}>
        <NavBar title={this.props.title} leftAction={()=>{Actions.pop()}}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
          initialListSize={9}
          >
        </ListView>
        <ActionSheet
          ref={(object) => this.ActionSheet = object}
          title = "停止关注?"
          options={buttons}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this._handlePress.bind(this)}
        />
      </View>
    )
  }

  _subscribeButtonAction(item) {
    this.setState({
      currentChannelId: item._id
    });
    this.ActionSheet.show();
  }

  renderRow(item){
    return(
      <TouchableHighlight onPress={() => Actions.channelDetail({id:item._id})}>
        <View style={[Styles.horizontalView, {justifyContent: 'space-between', height: 80, backgroundColor: 'white'}]}>
          <View style={Styles.horizontalView}>
            <Image source={{uri:imageUrlSize.smallSize(item.icon)}} style={styles.rowImage}/>
            <Text style={[Styles.LBMText, {marginLeft: 16}]}>{item.name}</Text>
          </View>
          <SubscribeButton
            style={{marginRight: 16}}
            onPress={() => this._subscribeButtonAction(item)}
            select={true}
            />
          <BottomLineView style={{marginLeft: 80}}/>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = {
  listView: {
    flex: 1,
  },
  row: {
    height: 80,
    backgroundColor: 'white'
  },
  rowImage: {
    width: 48,
    height: 48,
    marginLeft: 16,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.separatorColor
  }
}
