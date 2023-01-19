/*
 * 商品详情
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
  Animated,
  Easing,
  StyleSheet
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

const dismissDuration = 100

import PopupDialog, {SlideAnimation} from 'react-native-popup-dialog'
import {getToken} from '../../models/User'
import NavBar from '../compents/NavbarRender'
import realm from '../../models/realm'
import TopLineView from '../compents/TopLineView'
import BottomLineView from '../compents/BottomLineView'
import RightLineView from '../compents/RightLineView'
import Styles from '../other/Styles'
import * as imageUrlSize from '../other/ImageUrlSize'
import * as Colors from '../other/Colors'
import SpecItemView from '../compents/SpecItemView'
import RedButton from '../compents/RedButton'
import Modal  from 'react-native-modalbox'

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' })

export default class CommodityDetailRender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specSelects: [],
      commodityInfo: undefined,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  }

  componentDidMount() {
    const token = getToken();
    fetch('http://api.xinpinget.com' + '/review/detail/' + this.props.id + '?token=' + token)
      .then((response) => response.json())
      .then((response) => response.result)
      .then((responseData) => {
        if (responseData) {
          var array = [];
          for (var i = 0; i < responseData.products.length; i++) {
            array.push(false)
          };
          array[0] = true;
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.mainContents),
            commodityInfo: responseData,
            specSelects: array
          });
        }
      })
      .done();
  }

  render() {
    if (this.state.commodityInfo) {
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <NavBar
            title={'详情'}
            type={'share'}
            leftAction={()=>{Actions.pop()}}
            rightAction={()=>this._shareAction()}
          />
          <ListView
            initialListSize={4}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            renderHeader={() => this.renderHeader(this.state.commodityInfo)}
            renderFooter={() => this.renderFooter(this.state.commodityInfo)}
            style={styles.listView}
            initialListSize={2}
            showsVerticalScrollIndicator={false}
          />
          {this._bottomView(this.state.commodityInfo)}
          <PopupDialog
            dialogStyle={{backgroundColor: 'transparent'}}
            ref={(popupDialog) => { this.popupDialog = popupDialog;}}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height}
            haveTitleBar={false}
            dialogAnimation = {slideAnimation}
            >
              {this._popupView()}
          </PopupDialog>
          <Modal
            style={{height: 192}}
            position={"bottom"}
            ref={"shareView"}
            animationDuration={350}
          >
            {this._otherView()}
          </Modal>
        </View>
      )
    }
    return <View style={Styles.container}/>;
  }

  _popupView(){
    return(
      <View style={{backgroundColor: 'transparent', flex: 1, justifyContent: 'center'}}>
        <View style={{margin: 16, backgroundColor: 'white', borderRadius: 12}}>
          <View style={[Styles.spaceBetweenView, {height: 56, marginLeft: 16, marginRight: 16}]}>
            <TouchableOpacity onPress={()=>{this.popupDialog.closeDialog()}}>
              <Text style={{color: Colors.redColor, fontSize: 15}}>{'取消'}</Text>
            </TouchableOpacity>
            <Text style={{color: Colors.blackColor, fontSize: 17}}>{'取消'}</Text>
            <TouchableOpacity onPress={()=>{this.popupDialog.closeDialog()}}>
              <Text style={{color: Colors.redColor, fontSize: 15}}>{'购物车'}</Text>
            </TouchableOpacity>
            <BottomLineView style={{marginLeft: 16, marginRight: 16}}/>
          </View>
          <View style={{margin: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={Styles.MBRText}>{'你要戴套，你的手机也要'}</Text>
              <Text style={[Styles.MBRText, {marginBottom: 10, marginTop: 10}]}>{'69 元'}</Text>
              <Text style={Styles.SGRText}>{'运费 10 元'}</Text>
            </View>
            <Image
              source={{uri:this.state.commodityInfo.products[0].img}}
              style={{height: 70, width: 70}}
            >
            </Image>
          </View>
          {this._specViews()}
          <View style={{height: 76, justifyContent: 'center'}}>
            <TopLineView/>
            <RedButton
              text={'确认'}
              style={{marginLeft: 16, marginRight: 16}}
              onPress={()=>{this._confimButtonAction()}}
            />
          </View>
        </View>
      </View>
    )
  }
  _confimButtonAction(){
    this.popupDialog.closeDialog();
    // element 数组长度
    let index = this.state.specSelects.findIndex((element, index, array) => {
      var object = array[index];
      return object === true;
    });
    var product = this.state.commodityInfo.products[index];
    product.amount = '1';
    var buyProduct = {
      'title':this.state.commodityInfo.title,
      'products' : [product],
    };
    console.log(buyProduct);
    Actions.tradeConfim({buyProduct : buyProduct})
  }

  _specAction(index){
    var array = this.state.specSelects.map((object) => false);
    array[index] = true;
    this.setState({
      specSelects: array
    });

  }
  _specViews(){
    var specViews = [];
    let products = this.state.commodityInfo.products;
    let specSelects = this.state.specSelects;
    for (var i = 0; i < products.length; i++) {
      specViews.push(
        <SpecItemView
          key={i}
          text={products[i].spec}
          onPress={this._specAction.bind(this, i)}
          selected={specSelects[i]}
        />
      )
    }
    if (specSelects.length !== 1) {
      return(
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, marginRight: 8}}>
          {specViews}
        </View>
      )
    }
    return null;
  }
  _buyButtonAction(){
    this.popupDialog.openDialog();
  }

  _bottomView(commodityInfo){
    return(
      <TouchableHighlight onPress={() =>{ this._buyButtonAction()}}>
        <View style={styles.bottomView}>
          <Text style={{color: 'white', fontSize: 15, marginBottom:2}}>{'￥' + commodityInfo.price}</Text>
          <Text style={{color: 'white', fontSize: 13}}>立即购买</Text>
        </View>
      </TouchableHighlight>
    )
  }

  renderHeader(commodityInfo) {
    if (commodityInfo) {
      var likeNumber = `${commodityInfo.realLikeCount} 人喜欢`;
      return (
        <View style={styles.header}>
          <TouchableHighlight onPress={() => this._avatarAction(commodityInfo)}>
            <View style={styles.avatarView}>
              <Image source={{uri: commodityInfo.channel.icon}} style={styles.avatar}/>
              <Text style={styles.channelName}>{commodityInfo.channel.name}</Text>
            </View>
          </TouchableHighlight>
          <Image source={{uri: imageUrlSize.superBigSize(commodityInfo.img)}} style={styles.headerCover}/>
          <View>
            <View style={{marginLeft:16}}>
              <Text style={styles.title}>{commodityInfo.title}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.likeNumber}>{likeNumber}</Text>
              </View>
            </View>
            <View style={styles.headerBottomView}>
              <TopLineView/>
            </View>
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

  renderFooter(commodityInfo){
    if (commodityInfo) {
      var likeNumber = commodityInfo.realLikeCount + ' 人喜欢';
      var shareNumber = commodityInfo.shareCount + ' 人告诉朋友';
      return (
        <View style={styles.footer}>
          <TouchableOpacity style={{flex:1}}>
            <View style={{flex:1, backgroundColor: 'white'}}>
              <BottomLineView/>
              <TopLineView/>
              <RightLineView/>
              <View style={styles.centerView}>
                <Image source={require('../../assets/iconRoundLikeNormal.png')}></Image>
                <Text style={{color: 'rgba(171,171,171,1)',fontSize: 12, marginTop: 15}}>{likeNumber}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this._shareAction()} style={{flex:1}}>
            <View style={{flex:1, backgroundColor: 'white'}}>
              <BottomLineView/>
              <TopLineView/>
              <View style={styles.centerView}>
                <Image source={require('../../assets/iconRoundShareNormal.png')}></Image>
                <Text style={{color: 'rgba(171,171,171,1)',fontSize: 12, marginTop: 15}}>{shareNumber}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
    // http://7xqycw.com1.z0.glb.clouddn.com/81292bd86c845c0faba7f7914bebd97a_550_374.jpg
    var img = item.img.replace(/\.[^/.]+$/, "");
    var textArray = img.split('_');
    var width = textArray[textArray.length - 2];
    var height = textArray[textArray.length - 1];
    var rate = height/width;
    var imageHeight = (Dimensions.get('window').width - 16 * 2.0) * rate;
    return(
        <View style={{backgroundColor: 'white'}}>
          {item.img ?<Image source={{uri: imageUrlSize.superBigSize(item.img)}} style={[{height: imageHeight}, styles.cover]}/> : null}
          {item.text ?<Text style={styles.body}>{item.text}</Text> : null}
        </View>
    )
  }

  _otherView() {
    return(
      <View style={styles.shareView}>
        <View style={styles.shareContent}>
          <TouchableHighlight>
            <View style={{alignItems:'center'}}>
              <Image source={require('../../assets/signinShareWechatDefault.png')}/>
              <Text style={styles.shareTitle}>{'微信好友'}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={{alignItems:'center'}}>
              <Image source={require('../../assets/signinShareTimelineDefault.png')}/>
              <Text style={styles.shareTitle}>{'朋友圈'}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={{alignItems:'center'}}>
              <Image source={require('../../assets/signinImageWeiboDefault.png')}/>
              <Text style={styles.shareTitle}>{'微博'}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={()=>{this._cancelAction()}}>
          <Text style={{fontSize: 14}}>{"取消"}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _cancelAction(){
    this.refs.shareView.close();
  }

  _avatarAction(commodityInfo){
    Actions.channelDetail({id:commodityInfo.channel._id})
  }

  _shareAction(){
    this.refs.shareView.open();
  }
}

const styles = {
  listView: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  row: {
    flex: 1,
    backgroundColor: 'white'
  },
  cover: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    backgroundColor: 'rgb(244,244,244)',
  },
  body: {
    color: 'rgba(66,66,66,1)',
    fontSize: 15,
    fontWeight: '100',
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16
  },
  header: {
    flex:1,
    backgroundColor: 'white'
  },
  footer: {
    height: 174,
    flexDirection: 'row',
  },
  headerCover: {
    height: 268,
    backgroundColor: 'rgb(244,244,244)',
  },
  headerBottomView: {
    height: 18,
    backgroundColor: 'rgba(244,244,244,1)'
  },
  title: {
    color: 'rgba(66,66,66,1)',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    lineHeight: 22,
  },
  likeNumber: {
    color: 'rgba(171,171,171,1)',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 16
  },
  avatar: {
    height: 32,
    width: 32,
    marginLeft: 12,
    borderRadius: 16,
    borderColor: 'rgba(238,238,238,1)',
    borderWidth: 1
  },
  channelName: {
    color: 'rgba(66,66,66,1)',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 10,
  },
  avatarView: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  share: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: 30
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  shareTitle: {
    color: 'rgba(66,66,66,1)',
    fontSize: 12,
    fontWeight: '100',
    marginTop: 16,
  },
  bottomView: {
    backgroundColor: Colors.redColor,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shareView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  shareContent: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cancelButton: {
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(230,230,230)'
  }
}
