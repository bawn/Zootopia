/*
 * 首页
 */

 import React, {
   Component,
 } from 'react'

import {
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import NavBar from '../compents/NavbarRender'
import Styles from '../other/Styles'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import BottomLineView from '../compents/BottomLineView'
import {getToken} from '../../models/User'

const ImageHeight = Dimensions.get('window').width * 0.5

export default class HomeRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listener: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentDidMount(){
    this._updateData();
  }

  componentWillMount(){
    this.listener = RCTDeviceEventEmitter.addListener('updateHome', ()=>{
      this._updateData();
    });
  }

  _updateData(){
    // 获取token
    const token = getToken();
    fetch('http://api.xinpinget.com' + '/timeline/list' + '?token=' + token)
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

  componentWillUnmount(){
    this.listener.remove();
  }

  render(){
    return(
      <View style={Styles.container}>
        <NavBar title={this.props.title} hideBackButton={true}/>
        <ListView
          initialListSize={4}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
          style={styles.listView}
          >
        </ListView>
      </View>
    )
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return(
      <View key={`{sectionID}-${rowID}`} style={styles.separator}/>
    )
  }
  renderRow(item, sectionID, rowID,){
    if (item.type === 'review') {
      return(
        <TouchableHighlight
          onPress={()=>{Actions.commodityDetail({id:item.entityId})}}
          style={{flex: 1, backgroundColor: 'white'}}
          >
          <View style={{backgroundColor: 'white'}}>
            <Image source={{uri: item.cover}} style={styles.rowImage}/>
            <Text style={styles.title} numberOfLines ={1}>{item.title}</Text>
            <View style={styles.textContent}>
              <TouchableOpacity onPress={() => this._channelAction(item)}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image source={{uri: item.channelIcon}} style={styles.avatar}>
                  </Image>
                  <Text style={styles.subTitle}>{item.channelName}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.verticalLine}/>
              <Text style={styles.subTitle}>{item.likeCount + '人喜欢'}</Text>
            </View>
            <BottomLineView/>
          </View>
        </TouchableHighlight>
      )
    }
    else {
      return(
        <TouchableHighlight onPress={()=>this._activityAction(item)}>
          <View style={styles.activity}>
            <Image source={{uri: item.img}} style={{flex: 1}}></Image>
          </View>
        </TouchableHighlight>
      )
    }
  }

  _channelAction(item){
    Actions.channelDetail({id: item.channelId})
  }
  _activityAction(item){
    if (item.jump.type === 'link') {
      Actions.webView({uri: item.jump.link})
    }
  }
}

const styles = {
  listView: {
    flex: 1,
    marginBottom: 44
  },
  row: {
    flex: 1,
    backgroundColor: 'white'
  },
  rowImage: {
    flex:1,
    height: 250
  },
  textContent: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom: 9,
  },
  subTitle: {
    marginLeft: 8,
    fontSize: 12,
    color: 'rgba(171,171,171,1)',
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
  avatar: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderColor: 'rgba(238,238,238,1)',
    borderWidth: 1
  },
  verticalLine: {
    width: StyleSheet.hairlineWidth,
    height: 12,
    marginLeft: 10,
    backgroundColor: 'rgba(230,230,230,1)'
  },
  separator: {
    height: 18,
    backgroundColor: 'rgb(244,244,244)'
  },
  activity: {
    height: ImageHeight,
    backgroundColor: 'white'
  }
};
