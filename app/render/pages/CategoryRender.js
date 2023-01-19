/*
 * 分类列表
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
  Dimensions
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

const iconWidth = (Dimensions.get('window').width) / 3

import {getToken} from '../../models/User'
import NavBar from '../compents/NavbarRender'
import Styles from '../other/Styles'
import realm from '../../models/realm'
import SubscribeButton from '../compents/SubscribeButton'
import Swiper from 'react-native-swiper';

export default class CategoryRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      major: undefined,
      activity: undefined,
    };
  }

  componentWillMount() {
    const minor = 'http://api.xinpinget.com' + '/category/list/minor';
    const major = 'http://api.xinpinget.com' + '/category/list/major';
    const activity = 'http://api.xinpinget.com' + '/category/list/activity';

    var urls = [minor, major, activity];
    Promise.all(urls.map(url =>
        fetch(url).then(response => response.json())
    )).then(responseData => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData[0].result[0]['channels']),
          major: responseData[1].result,
          activity: responseData[2].result,
        });
    })
    .done();

  }

  render(){
    return(
      <View style={Styles.container}>
        <NavBar title={this.props.title} leftAction={Actions.pop} hideBackButton={true}/>
        <ListView
          removeClippedSubviews={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
          renderHeader={() => this.renderHeader(this.state.major, this.state.activity)}
          >
        </ListView>
      </View>
    )
  }

  _iconAction(index) {
    let item = this.state.major[index];
    Actions.channelList({id:item._id, title:item.name})
  }
  _bannerAction(index) {
    let item = this.state.activity[index];
    if (item.jump.type === 'review') {
      Actions.commodityDetail({id:item.jump.entity})
    }
    else if (item.jump.type === 'channel') {
      Actions.channelDetail({id:item.jump.entity})
    }
  }

  renderHeader(major, activity) {
    if (major && activity) {
      const channles = [];
      const banners = [];
      for (let index = 0; index < major.length; index ++){
        let item = major[index];
        channles.push(
          <TouchableHighlight key={index} onPress={this._iconAction.bind(this, index)}>
            <View style={styles.iconView}>
              <Image style={styles.icon} source={{uri: item.icon}}/>
              <Text style={styles.iconText}>{item.name}</Text>
            </View>
          </TouchableHighlight>
        );
      };
      for (let index = 0; index < activity.length; index ++){
        let item = activity[index];
        banners.push(
          <TouchableHighlight key={index} onPress={this._bannerAction.bind(this, index)}>
            <Image style={{height: 190}} source={{uri: item.img}}/>
          </TouchableHighlight>
        );
      };
      return (
        <View>
          <Swiper
            height={banners.length ? 190 : 0.1}
            dot={<View style={styles.dot}/>}
            showsButtons={false}
            autoplay={true}
            activeDot={<View style={styles.activeDot}/>}
          >
            {banners}
          </Swiper>
          <View style={styles.header}>
            {channles}
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

  renderRow(item){
    var info = item.subscribeCount + '订阅 · ' + item.update;
    return(
      <View style={styles.row}>
        <TouchableHighlight onPress={() => Actions.channelDetail({id:item._id})}>
          <View style={{backgroundColor: 'white'}}>
          <Image source={{uri: item.cover}} style={styles.cover}/>
          <View style={styles.content}>
            <View style={styles.horizontal}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.labelView}>
                <Text style={styles.label}>{item.label.text}</Text>
              </View>
            </View>
            <Text style={styles.summary}>{item.summary}</Text>
            <Text style={styles.info}>{info}</Text>
          </View>
          <SubscribeButton style={styles.subscribeButton}></SubscribeButton>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}


const styles = {
  listView: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
    marginBottom: 44
  },
  row: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 16
  },
  cover: {
    height: 191,
  },
  title: {
    fontSize: 17,
    color: 'rgba(66,66,66,1)',
    fontWeight: '600',
  },
  content: {
    marginTop: 43,
    marginLeft: 16,
    marginRight: 16,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelView: {
    borderColor: 'rgba(66,66,66,1)',
    borderWidth: 1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  label: {
    fontSize: 10,
    color: 'rgba(66,66,66,1)',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    marginBottom: 2
  },
  subscribeButton: {
    position: 'absolute',
    right: 16,
    bottom: 56
  },
  summary: {
    fontSize: 13,
    color: 'rgba(66,66,66,1)',
    fontWeight: '100',
    marginTop: 8,
    marginBottom: 8
  },
  info: {
    fontSize: 12,
    color: 'rgba(171,171,171,1)',
    fontWeight: '100',
    marginBottom: 16
  },
  header: {
    // flex:1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    height: 50,
    width: 50
  },
  iconText: {
    fontSize: 14,
    color: 'rgba(66,66,66,1)',
    marginTop: 4
  },
  iconView: {
    backgroundColor: 'white',
    height: iconWidth,
    width: iconWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(244,244,244,1)',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.6)',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 5
  },
  activeDot: {
    backgroundColor: 'rgb(255,255,255)',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 5
  }
}
