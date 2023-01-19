
/*
 * 频道详情
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
  StatusBar
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import {getToken} from '../../models/User'
import NavBar from '../compents/NavbarRender'
import Styles from '../other/Styles'
import realm from '../../models/realm'
import TagsView from '../compents/TagsView'
import SubscribeButton from '../compents/SubscribeButton'
import TopLineView from '../compents/TopLineView'
import * as imageUrlSize from '../other/ImageUrlSize'

const THRESHOLDVALUE = 140

export default class CategoryRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      channelInfo: undefined,
      opacity: 0,
      coverHeight: 250,
      offsetY: 0
    };
  }


  componentWillMount() {
    // StatusBar.setBarStyle('light-content')
    const reviews = 'http://api.xinpinget.com' + '/channel/' + this.props.id + '/contents'+ '?token=' + getToken();
    const info = 'http://api.xinpinget.com' + '/channel/' + this.props.id + '/info'+ '?token=' + getToken();

    var urls = [reviews, info];
    Promise.all(urls.map(url =>
        fetch(url).then(response => response.json())
    )).then(responseData => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData[0].result),
          channelInfo: responseData[1].result
        });
    })
    .done();
  }


  onScroll(event) {
    let y = event.nativeEvent.contentOffset.y
    let opacity = Math.min(1, y/THRESHOLDVALUE)
    this.setState({
      opacity: opacity,
    })
  }

  _backAction() {
    // StatusBar.setBarStyle('default');
    Actions.pop();
  }

  _channelInfo(channelInfo) {
    return channelInfo.reviewCount + '好物  ·  ' + channelInfo.subscribeCount + '粉丝';
  }

  render(){
    return(
      <View style={Styles.container}>
        <ListView
          initialListSize={4}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderHeader={() => this.renderHeader(this.state.channelInfo)}
          onScroll={this.onScroll.bind(this)}
          initialListSize={2}
          style={styles.listView}
          >
        </ListView>
        <NavBar
          title={this.props.title}
          leftAction={Actions.pop}
          style={{top:0, left: 0, right: 0, position: 'absolute', opacity:this.state.opacity}}
        />
        <TouchableOpacity
          onPress={() => {Actions.pop()}}
          style={styles.backButton}>
          <Image
            source={require('../../assets/nav_whiteback_icon.png')}
            style={{opacity:1 - this.state.opacity}}>
          </Image>
        </TouchableOpacity>
      </View>
    )
  }

  renderRow(item){
    return(
      <View style={styles.row}>
        <TouchableHighlight
          onPress={()=>{Actions.commodityDetail({id:item.entityId})}}
          style={{flex: 1}}
          >
          <View style={{backgroundColor: 'white'}}>
            <Image source={{uri: item.cover}} style={styles.rowImage}/>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.textContent}>
              <Text style={styles.subTitle}>{item.likeCount + '人喜欢'}</Text>
            </View>
          </View>
        </TouchableHighlight>
      <View style={styles.bottomView}/>
      </View>
    )
  }

  _subscribeAction(channelInfo) {
    const operate = channelInfo.subscribed ? 'unsubscribe/' : 'subscribe/';
    fetch('http://api.xinpinget.com/channel/' + operate + channelInfo._id +'?token=' + getToken() ,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          let channelInfo = this.state.channelInfo;
          channelInfo.subscribed = !channelInfo.subscribed;
          this.setState({
            channelInfo: channelInfo
          });
        }
      })
    .done();
  }

  renderHeader(channelInfo) {
    if (channelInfo) {
      return (
        <View style={styles.header}>
          <Image
            source={{uri: channelInfo.cover}}
            style={{backgroundColor: 'rgb(244,244,244)', height: 250}}/>
          <View>
            <View style={{marginLeft:118}}>
              <Text style={styles.headerTitle}>{channelInfo.name}</Text>
              <Text style={styles.headerSubTitle}>{this._channelInfo(channelInfo)}</Text>
              <Text style={styles.desc} >{channelInfo.desc}</Text>
              <SubscribeButton style={styles.subscribeButton}
                select={channelInfo.subscribed}
                onPress={()=>this._subscribeAction(channelInfo)}/>
            </View>
            <View style={styles.bottomView}>
              <TopLineView/>
            </View>
          </View>
          <View style={styles.avatarContent}>
            <Image source={{uri: imageUrlSize.mediumSize(channelInfo.author.avatar)}} style={styles.avatar}/>
          </View>
        </View>
      )
    }
    else {
      return (
        <View/>
      )
    }
  }
}

const styles = {
  listView: {
    flex: 1,
    backgroundColor: 'rgb(244,244,244)',
  },
  row: {
    flex: 1,
    height: 228,
    backgroundColor: 'white'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  avatarContent: {
    left: 16,
    top: 233,
    borderWidth: 1,
    borderRadius: 40,
    position: 'absolute',
    borderColor: 'rgba(238,238,238,1)',
    backgroundColor: 'rgb(244,244,244)',
    overflow: 'hidden'
  },
  header: {
    // flex:1,
    // height: 441,
    backgroundColor: 'white'
  },
  headerTitle: {
    fontSize: 15,
    color: 'rgba(66,66,66,1)',
    fontWeight: '600',
    marginTop: 16,
  },
  headerSubTitle: {
    fontSize: 12,
    color: 'rgba(171,171,171,1)',
    marginTop: 10,
  },
  desc: {
    fontSize: 13,
    color: 'rgba(66,66,66,1)',
    marginTop: 0,
    lineHeight: 24,
    fontWeight: '100',
    marginRight: 16,
    marginBottom: 16
  },
  backButton: {
    position: 'absolute',
    top: 14,
    left: 0,
    height: 56,
    marginLeft: 13,
    justifyContent: 'center',
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
  },
  subTitle: {
    marginLeft: 8,
    fontSize: 12,
    color: 'rgba(171,171,171,1)',
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16
  },
  verticalLine: {
    width: 0.5,
    height: 12,
    marginLeft: 10,
    backgroundColor: 'rgba(230,230,230,1)'
  },
  bottomView: {
    marginTop: 0,
    height: 18,
    backgroundColor: 'rgba(244,244,244,1)'
  },
  subscribeButton: {
    marginTop: 0,
    marginBottom: 24,
    width: 70
  },
}
