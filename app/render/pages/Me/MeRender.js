import React, {
 Component,
} from 'react'

import {
 Text,
 View,
 Image,
 ScrollView,
 TouchableHighlight,
} from 'react-native'

import {
  Actions,
} from 'react-native-router-flux'

import BottomLineView from '../../compents/BottomLineView'
import NavBar from '../../compents/NavbarRender'
import TopLineView from '../../compents/TopLineView'
import Styles from '../../other/Styles'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import * as Colors from '../../other/Colors'
import {getToken} from '../../../models/User'

export default class MeRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: undefined,
    };
  }

  componentWillMount(){
    const token = getToken();
    fetch('http://api.xinpinget.com' + '/app/profile' + '?token=' + token)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            userInfo: responseData.result,
          });
        }
      })
      .done();
  }

  orderAction(){
    Actions.orderList()
  }

  onlineServiceAction(){
    const token = getToken();
    let uri = 'https://chat.xinpinget.com/feedback?token='+token;
    Actions.webView({uri:uri, title: '在线客服'})
  }

  render(){
    if (this.state.userInfo) {
      var orderCount = this.state.userInfo.orderCount;
      var subscribeCount = this.state.userInfo.subscribeCount;
      var likedCount = this.state.userInfo.likedCount;
      var info = '买到' + orderCount + '个好物 · ' + subscribeCount + '个订阅 · ' + likedCount + '喜欢';
      return(
        <View style={{flex:1}}>
          <ParallaxScrollView
            contentBackgroundColor="rgb(244,244,244)"
            headerBackgroundColor = "white"
            backgroundColor = "rgb(244,244,244)"
            stickyHeaderHeight={ 10 }
            parallaxHeaderHeight={250}
            renderForeground={() => this._renderForeground(info)}
            renderBackground = {() => this._renderBackground()}
            >
            {this.contentView()}
          </ParallaxScrollView>
        </View>
      )
    }
    else {
      return (<View style={Styles.container}/>)
    }
  }
  _renderBackground(){
    return(
      <Image source={require('../../../assets/bgStar.png')}/>
    )
  }
  _renderForeground(info){
    return(
      <View style={styles.header}>
        <Image
          defaultSource={require('../../../assets/iconAvatarDefault.png')}
          source={{uri:this.state.userInfo.avatar}}
          style={styles.avatar}
          />
        <Text style={styles.nickName}>{this.state.userInfo.nickname}</Text>
        <Text style={styles.info}>{info}</Text>
      </View>
    )
  }
  contentView() {
    return (
      <View>
        <TouchableHighlight underlayColor={'rgba(200,200,200,1)'} onPress={()=>this.orderAction()}>
        <View style={styles.cell}>
          <View style={styles.horizontalView}>
            <Image source={require('../../../assets/iconMeOrder.png')} style={styles.cellImage}/>
            <Text style={styles.cellText}>{'我的订单'}</Text>
          </View>
          <Image source={require('../../../assets/iconDisclosureIndicator.png')} style={{marginRight:10}}/>
          <BottomLineView style={{marginLeft: 16}}></BottomLineView>
        </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={'rgba(200,200,200,1)'} onPress={()=>Actions.mySubscribe()}>
        <View style={styles.cell}>
          <View style={styles.horizontalView}>
            <Image source={require('../../../assets/iconMeFeed.png')} style={styles.cellImage}/>
            <Text style={styles.cellText}>{'我的订阅'}</Text>
          </View>
          <Image source={require('../../../assets/iconDisclosureIndicator.png')} style={{marginRight:10}}/>
          <BottomLineView style={{marginLeft: 16}}></BottomLineView>
        </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor={'rgba(200,200,200,1)'} onPress={()=>Actions.myLikes()}>
        <View style={styles.cell}>
          <View style={styles.horizontalView}>
            <Image source={require('../../../assets/iconMeLike.png')} style={styles.cellImage}/>
            <Text style={styles.cellText}>{'我的喜欢'}</Text>
          </View>
          <Image source={require('../../../assets/iconDisclosureIndicator.png')} style={{marginRight:10}}/>
          <BottomLineView style={{marginLeft: 16}}></BottomLineView>
        </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor={'rgba(200,200,200,1)'} onPress={()=>Actions.myCouponList()}>
        <View style={[styles.cell, Styles.bottomLine]}>
          <View style={styles.horizontalView}>
            <Image source={require('../../../assets/iconMeCoupon.png')} style={styles.cellImage}/>
            <Text style={styles.cellText}>{'优惠券'}</Text>
          </View>
          <Image source={require('../../../assets/iconDisclosureIndicator.png')} style={{marginRight:10}}/>
        </View>
        </TouchableHighlight>

        {/* <TouchableHighlight underlayColor={'rgba(200,200,200,1)'}
          onPress={()=>this.onlineServiceAction()}>
        <View style={styles.cell}>
          <View style={styles.horizontalView}>
            <Image source={require('../../../assets/iconMeService.png')} style={styles.cellImage}/>
            <Text style={styles.cellText}>{'在线客服'}</Text>
          </View>
          <Image source={require('../../../assets/iconDisclosureIndicator.png')} style={{marginRight:10}}/>
          <BottomLineView></BottomLineView>
        </View>
        </TouchableHighlight> */}
        <View style={{height: 16, backgroundColor: 'rgba(244,244,244,1)'}}/>
        <TouchableHighlight underlayColor={'rgba(200,200,200,1)'} onPress={()=>Actions.qaHome()}>
          <View style={[styles.cell, Styles.topLine]}>
            <View style={styles.horizontalView}>
              <Image source={require('../../../assets/iconMeService.png')} style={styles.cellImage}/>
              <Text style={styles.cellText}>{'客服与帮助'}</Text>
            </View>
            <Image source={require('../../../assets/iconDisclosureIndicator.png')} style={{marginRight:10}}/>
            <BottomLineView style={{marginLeft: 16}}></BottomLineView>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={'rgba(200,200,200,1)'} onPress={()=>Actions.setting()}>
          <View style={[styles.cell, Styles.bottomLine]}>
            <View style={styles.horizontalView}>
              <Image source={require('../../../assets/iconMeSetting.png')} style={styles.cellImage}/>
              <Text style={styles.cellText}>{'设置'}</Text>
            </View>
            <Image source={require('../../../assets/iconDisclosureIndicator.png')} style={{marginRight:10}}/>
          </View>
        </TouchableHighlight>
        <View style={{height: 16, backgroundColor: 'rgb(244,244,244)'}}/>
      </View>
    )
  }
}

const styles = {
  container: {
    // flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    // backgroundColor: 'white'
  },
  avatar: {
    height: 80,
    width: 80,
    marginTop: 60,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  nickName: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
    backgroundColor: 'transparent'
  },
  info: {
    fontSize: 12,
    marginBottom: 50,
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent'
  },
  cell: {
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  cellText: {
    marginLeft: 13,
    fontSize: 16,
    color: 'rgb(66,66,66)'
  },
  cellImage: {
    marginLeft: 13
  },
  horizontalView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
}
