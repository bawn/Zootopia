
/*
 * 订单详情
 */

 import React, {
   Component,
 } from 'react'

import {
  Text,
  View,
  Image,
  Alert,
  Dimensions,
  ListView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import Styles from '../other/Styles'
import {getToken} from '../../models/User'
import NavBar from '../compents/NavbarRender'
import BottomLineView from '../compents/BottomLineView'
import TopLineView from '../compents/TopLineView'
import OrderState from '../compents/OrderState'
import * as Colors from '../other/Colors'
import ActionSheet from 'react-native-actionsheet'
import Communications from 'react-native-communications'
import TextStyles from '../other/TextStyles'

const cellWidth = (Dimensions.get('window').width - 30) / 2
const buttons = ['电话客服', '在线客服','取消']

export default class OrderDetailRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetail: undefined,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentDidMount(){
    fetch('http://api.xinpinget.com' + '/order/detail/' + this.props.id + '?token=' + getToken())
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            orderDetail: responseData.result,
            dataSource: this.state.dataSource.cloneWithRows(responseData.result.products),
          });
        }
      })
      .done();
  }

  _userInfo() {
    return this.state.orderDetail.address.name + ' ' + this.state.orderDetail.address.phone;
  }
  _address() {
    return this.state.orderDetail.address.city  + this.state.orderDetail.address.address;
  }
  render() {
    if (this.state.orderDetail) {
      return (
        <View style={{flex:1, backgroundColor:'white'}}>
          <NavBar title={this.props.title}
          type={'text'}
          rightTitle={'客服'}
          rightAction={()=>{this.ActionSheet.show()}}
          />
          {this._orderDetail()}
          {/* <ActionSheet
            ref={(object) => this.ActionSheet = object}
            title = "联系客服"
            options={buttons}
            cancelButtonIndex={2}
            onPress={this._handlePress.bind(this)}
          /> */}
        </View>
      )
    }
    else {
      return <View style={Styles.container}></View>
    }
  }
  _orderDetail(){
    return(
      <ScrollView style={Styles.container}>
        <OrderState orderState={this.state.orderDetail.state}/>
        <View style={[styles.paddingView, Styles.topBottomLine]}>
          <Image
            source={require('../../assets/iconTradeLocation.png')}
            style={Styles.marginLR}
          />
          <View style={{flex: 1}}>
            <Text style={styles.buyerName}>{this._userInfo()}</Text>
            <Text style={styles.address}>{this._address()}</Text>
          </View>
        </View>
        <View style={styles.splitView}></View>
        <View style={[styles.paddingView, Styles.topLine]}>
          <Image
            source={require('../../assets/iconTradeLocation.png')}
            style={Styles.marginLR}
          />
          <Text style={[TextStyles.fifteenBMText, {marginLeft: 16}]}>
            {this.state.orderDetail.channel}
          </Text>
          <BottomLineView style={{marginLeft: 58}}/>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.container}
          >
        </ListView>
        <View style={styles.splitView}></View>
        {/* 下单时间 */}
        <View style={[styles.spaceView, Styles.topLine]}>
          <View style={styles.horizontalView}>
            <Image
              source={require('../../assets/iconTradeLocation.png')}
              style={Styles.marginLR}
            />
            <Text style={TextStyles.fourteenBRText}>{'下单时间'}</Text>
          </View>
          <Text style={Styles.MGRText}>{this.state.orderDetail.create}</Text>
          <BottomLineView style={{marginLeft: 58}}/>
        </View>
        {/* 订单号 */}
        <View style={[styles.spaceView, Styles.bottomLine]}>
          <View style={styles.horizontalView}>
            <Image
              source={require('../../assets/iconTradeLocation.png')}
              style={Styles.marginLR}
            />
            <Text style={TextStyles.fourteenBRText}>{'订单号'}</Text>
          </View>
          <Text style={Styles.MGRText}>{this.state.orderDetail.serialNo}</Text>
        </View>
        <View style={styles.splitView}></View>

        <View style={[styles.priceView, Styles.bottomLine]}>
          <Image
            source={require('../../assets/iconTradeLocation.png')}
            style={[Styles.marginLR, {marginTop: 14}]}
          />
          <View style={{flex: 1}}>
            {/* 商品总额 */}
            <View style={styles.spaceView}>
              <Text style={styles.title}>{'商品总额'}</Text>
              <Text style={Styles.MGRText}>{'￥' + this.state.orderDetail.productsTotalPrice}</Text>
            </View>
            {/* 优惠券 */}
            <View style={styles.otherSpaceView}>
              <Text style={styles.title}>{'优惠券'}</Text>
              <Text style={Styles.MGRText}>{'-￥' + this.state.orderDetail.couponReduce}</Text>
            </View>
            {/* 运费 */}
            <View style={styles.spaceView}>
              <Text style={styles.title}>{'运费'}</Text>
              <Text style={Styles.MGRText}>{'￥' + this.state.orderDetail.transferFee}</Text>
            </View>
            <View style={[styles.spaceView, Styles.topLine]}>
              <View>
                <Text style={[TextStyles.fifteenBMText, {marginBottom: 8}]}>
                  {'实付款'}
                </Text>
                <Text style={Styles.SBLText}>{'您使用支付宝完成了本次付款'}</Text>
              </View>
              <Text style={[Styles.XLBRText, {fontWeight: '600'}]}>
                {'￥' + this.state.orderDetail.totalPrice}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.splitView}></View>
      </ScrollView>
    )
  }
  _handlePress(index){
    if (index === 0) {
      // Communications.phonecall('400-153-1880', false)
      Alert.alert(
        '联系客服',// title
        '400-153-1880 \n 周一至周五：9:00 - 18:00',// message
        [
          {text: '取消'},
          {text: '拨打', onPress: () => {Communications.phonecall('400-153-1880', false)}}
        ]
      )
    }
    else if (index === 1) {
      const token = getToken();
      let uri = 'https://chat.xinpinget.com/feedback?token='+token;
      Actions.webView({uri:uri, title: '在线客服'})
    }
  }

  renderRow(item){
    return(
      <TouchableHighlight
        onPress={()=>{Actions.commodityDetail({id:this.state.orderDetail.review})}}
        style={{flex: 1}}
        >
        <View style={styles.row}>
          <BottomLineView style={{marginLeft: 58}}/>
          <View style={styles.rowContent}>
            <Text style={[Styles.MBRText, {lineHeight: 22}]}>{this.state.orderDetail.name}</Text>
            <Text style={[Styles.MGRText, {marginBottom:10, marginTop: 10}]}>{item.spec}</Text>
            <Text style={Styles.MGRText}>{'￥' + item.price + ' x ' + item.amount}</Text>
          </View>
          <Image source={{uri: item.img}} style={styles.rowImage}></Image>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowContent:{
    flex: 1,
    justifyContent: 'center',
    marginLeft: 58,
    marginRight: 8,
    marginTop: 16,
    marginBottom: 16
  },
  rowImage: {
    width: 75,
    height: 75,
    marginRight: 16
  },
  horizontalView: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  buyerName: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgb(66,66,66)',
    marginBottom: 8
  },
  paddingView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    backgroundColor: 'white'
  },
  address: {
    fontSize: 14,
    fontWeight: '100',
    color: 'rgb(66,66,66)',
    lineHeight: 22
  },
  splitView: {
    height: 16,
    backgroundColor: 'rgb(244,244,244)',
  },
  spaceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    backgroundColor: 'white'
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingRight: 16,
    backgroundColor: 'white'
  },
  otherSpaceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 16,
    backgroundColor: 'white'
  }
}
