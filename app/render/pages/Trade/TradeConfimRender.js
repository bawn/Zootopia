/*
 * 交易确认页面
 */

import React, {
  Component,
} from 'react'

import {
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  NativeModules
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import NavBar from '../../compents/NavbarRender'
import BottomLineView from '../../compents/BottomLineView'
import TopLineView from '../../compents/TopLineView'
import Styles from '../../other/Styles'
import * as Colors from '../../other/Colors'
import HighlightedButton from '../../compents/HighlightedButton'
import RedButton from '../../compents/RedButton'
import * as User from '../../../models/User'
import Url from '../../other/UrlCons'

const PingppPay = NativeModules.PingppPay;

export default class TradeConfimRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderConfirm : null,
    }
  }
  render() {
    if (this.state.orderConfirm) {
      return(
        <View style={styles.container}>
          <NavBar title={this.props.title}/>
          <ScrollView style={styles.container}>
            {this._addressView()}
            {this._productsView()}
            {this._couponsView()}
            {this._priceView()}
            {this._noteView()}
            {this._payMethod()}
            {this._payButton()}
          </ScrollView>
        </View>
      )
    }
    return <View style={styles.container}></View>
  }
  componentWillMount(){
    const token = User.getToken();
    var products = [];
    for (var object of this.props.buyProduct.products) {
      products.push({
        'product' : object._id,
        'amount' : object.amount
      })
    }
    var json = {'products' : products};
    fetch(Url.orderConfirm + token,
      {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((response) => response.result)
      .then((responseData) => {
        if (responseData) {
          this.setState({
            orderConfirm: responseData
          })
        }
      })
      .done();
  }

  _addressView(){
    var address = this.state.orderConfirm.defaultAddress;
    var name = address.name;
    var phone = address.phone;
    var addressString = `${address.city}${address.address}`
    return(
      <View style={styles.addressView}>
        <View style={Styles.horizontalView}>
          <Image
            source={require('../../../assets/iconTradeLocation.png')}
            style={Styles.marginLR}
          />
          <View style={styles.addressContentView}>
            <View style={Styles.horizontalView}>
              <Text style={Styles.LBMText}>{name}</Text>
              <Text style={[Styles.LBMText, {marginLeft:16}]}>{phone}</Text>
            </View>
            <Text style={styles.addressText}>{addressString}</Text>
          </View>
        </View>
        <Image
          source={require('../../../assets/iconDisclosureIndicator.png')}
          style={styles.accessoryView}
        />
        <BottomLineView style={{marginLeft: 16}}/>
      </View>
    )
  }
  _productsView(){
    var title = this.props.buyProduct.title;
    return(
      <View style={{flex:1, flexDirection: 'row'}}>
        <Image
          source={require('../../../assets/iconTradeLocation.png')}
          style={[Styles.marginLR, {marginTop: 16}]}/>
        <View style={{flexDirection: 'column', marginTop: 16}}>
          <Text style={Styles.LBMText}>{title}</Text>
          <Text style={[Styles.MBRText,{marginTop:8, marginBottom:18}]}>{this._specs()}</Text>
        </View>
        <BottomLineView style={{marginLeft: 16}}/>
      </View>
    )
  }

  _specs(){
    var products = this.props.buyProduct.products;
    var specs = '';
    for (var i = 0; i< products.length; i++){
      var product = products[i];
      if (product.hasOwnProperty('spec')) {
        specs += products[i]['spec'] + ' x ' + products[i]['amount'] + '\n';
      }
      else {
        specs += 'x ' + products[i]['amount'] + '\n';
      }
    }
    // 剔除最后一个换行符
    specs = specs.trim('\n');
    return specs;
  }

  _couponsView(){
    return(
      <View style={[{height: 54}, Styles.spaceBetweenView]}>
        <View style={Styles.horizontalView}>
          <Image source={require('../../../assets/iconTradeLocation.png')} style={Styles.marginLR}/>
          <Text style={Styles.LBMText}>{'暂无可用优惠券'}</Text>
        </View>
        <Image source={require('../../../assets/iconDisclosureIndicator.png')} style={{marginRight:10}}/>
        <BottomLineView style={{marginLeft: 16}}/>
      </View>
    )
  }
  _priceView(){
    var transferFee = this.state.orderConfirm.transferFee;
    var products = this.props.buyProduct.products;
    var price = 0;
    for (var object of products) {
      price += (object.price * object.amount)
    }
    price += transferFee;
    return(
      <View style={[{height: 74}, Styles.spaceBetweenView]}>
        <View style={Styles.horizontalView}>
          <Image source={require('../../../assets/iconTradeLocation.png')} style={Styles.marginLR}/>
          <Text style={Styles.LBMText}>{'实付款'}</Text>
        </View>
        <View style={{alignItems: 'flex-end', marginRight: 16}}>
          <Text style={{color: Colors.redColor, fontSize: 17}}>{`￥${price}`}</Text>
          <Text style={[Styles.SGMText, {marginTop: 6}]}>{`含运费${transferFee}`}</Text>
        </View>
        <BottomLineView style={{marginLeft: 16}}/>
      </View>
    )
  }
  _noteView(){
    return(
      <View style={[{height: 54}, Styles.horizontalView]}>
        <Image source={require('../../../assets/iconTradeLocation.png')} style={Styles.marginLR}/>
        <TextInput style={[Styles.MGRText, {height: 54, flex: 1}]} placeholder={'添加备注...'}></TextInput>
        <BottomLineView/>
      </View>
    )
  }
  _payMethod(){
    return(
      <View style={[{height: 78, flexDirection: 'row'}, Styles.centerView]}>
        <HighlightedButton
          source={require('../../../assets/iconAlipayNormal.png')}
          highlightedSource={require('../../../assets/iconAlipaySelected.png')}
          highlighted={true}
          style={{marginRight: 32}}
        />
        <HighlightedButton
          source={require('../../../assets/iconWechatNormal.png')}
          highlightedSource={require('../../../assets/iconWechatSelected.png')}
        />
      </View>
    )
  }
  _payButton(){
    return(
      <View style={{height: 76, justifyContent: 'center'}}>
        <RedButton
          style={{marginLeft: 16, marginRight: 16, height: 44}}
          text={'确认支付'}
          onPress={()=>this._payAction()}
        />
      </View>
    )
  }

  _payAction(){
    const token = User.getToken();
    var addressId = this.state.orderConfirm.defaultAddress._id;
    var products = [];
    for (var object of this.props.buyProduct.products) {
      products.push({
        'product' : object._id,
        'amount' : object.amount
      })
    }
    var json = {
      'products' : products,
      'payMethod' : 'alipay',
      'address' : addressId,
      'buyerNote' : '',
      'coupon' : '',
    };
    fetch(Url.orderCreate + token,
      {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((response) => response.result)
      .then((responseData) => {
        if (responseData) {
          PingppPay.payWithCharge(responseData, (result)=>{
            console.log(result);
          })
        }
      })
      .done();
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  addressView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16
  },
  addressContentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  accessoryView: {
    height: 24,
    width: 24,
  },
  addressText: {
    fontSize: 13,
    color: Colors.blackColor,
    fontWeight: '100',
    marginRight: 8,
    marginTop: 8
  }
}
