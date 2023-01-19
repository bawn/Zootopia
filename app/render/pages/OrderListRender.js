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
 ActivityIndicator
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'


import BottomLineView from '../compents/BottomLineView'
import TopLineView from '../compents/TopLineView'
import NavBar from '../compents/NavbarRender'
import {getToken} from '../../models/User'
import * as imageUrlSize from '../other/ImageUrlSize'
import * as Colors from '../other/Colors'
import Spinner from 'react-native-loading-spinner-overlay'

export default class OrderListRener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      // visible: false
    };
  }

  componentWillMount(){
    this.setState({
      visible: true
    });
    // 获取token
    const token = getToken();
    fetch('http://api.xinpinget.com' + '/order/list' + '?token=' + token)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.result),
            visible: !this.state.visible
          });
        }
      })
      .done();
  }

  specs(item){
    var products = item.products;
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

  _state(item){
    var specs = '';
    switch (item.state) {
      case 'delivered':
        specs += '已发货';
        break;
      case 'cancelled':
        specs += '已取消';
        break;
      case 'paid':
        specs += '备货中';
        break;
      case 'unpaid':
        specs += '待付款';
        break;
      default:

    }
    return specs;
  }
  _action(item){
    var specs = '';
    switch (item.state) {
      case 'delivered':
        specs += '查看物流';
        break;
      case 'cancelled':
        break;
      case 'paid':
        break;
      case 'unpaid':
        specs += '取消订单';
        break;
      default:

    }
    return specs;
  }

  render(){
    return(
      <View style={styles.container}>
        <NavBar title={this.props.title} leftAction={()=>{Actions.pop()}}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
          style={styles.listView}
          initialListSize={5}
          pageSize = {1}
        >
        </ListView>
      </View>
    )
  }
  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return(
      <View key={rowID} style={styles.bottomView}/>
    )
  }
  _stateButton(item){
    if (this._action(item).length) {
      return (
        <TouchableOpacity onPress={()=>this._stateAction(item)}>
          <View style={styles.actionContent}>
            <Text style={styles.actionButton}>{this._action(item)}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    else {
      return null
    }
  }

  _stateAction(item){
    var company = item.logistics.company;
    var serial_no = item.logistics.serial_no;
    var uri = 'http://m.kuaidi100.com/index_all.html?type=' + company + '&postid=' + serial_no;
    console.log(uri);
    Actions.webView({uri:uri, title: '物流信息'})
  }

  renderRow(item){
    return(
        <View>
          <TouchableHighlight
            onPress={()=>{Actions.orderDetail({id:item._id})}}
            style={{flex: 1}}
            >
          <View>
            <View style={styles.content}>
              <Image source={{uri: imageUrlSize.mediumSize(item.cover)}} style={styles.cover}/>
              <View style={styles.textContent}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.spec}>{this.specs(item)}</Text>
                <Text style={styles.price}>{'总额：' + item.totalPrice + ' 元'}</Text>
              </View>
            </View>
            <View style={styles.otherView}>
              <TopLineView/>
              <Text style={styles.state}>{this._state(item)}</Text>
              {this._stateButton(item)}
              <BottomLineView/>
            </View>
          </View>
          </TouchableHighlight>
        </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)'
  },
  listView: {
    flex: 1,

  },
  content: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  textContent: {
    flex: 1,
    marginTop: 16,
    flexDirection: 'column',
    marginBottom: 16,
    marginRight: 16
  },
  cover: {
    height: 80,
    width: 80,
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16,
    backgroundColor: 'rgba(238,238,238,1)'
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(66,66,66,1)',
    lineHeight: 22,
  },
  spec: {
    fontSize: 14,
    fontWeight: '100',
    color: 'rgba(66,66,66,1)',
    marginTop: 12,
    lineHeight: 22,
    marginBottom: 10
  },
  price: {
    fontSize: 14,
    fontWeight: '100',
    color: 'rgba(66,66,66,1)',
  },
  state: {
    fontSize: 14,
    color: 'rgba(66,66,66,1)',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: 'transparent'
  },
  bottomView: {
    height: 16,
    backgroundColor: 'rgb(244,244,244)'
  },
  actionView: {
    justifyContent: 'space-between'
  },
  actionButton: {
    fontSize: 12,
    color: 'rgb(66,66,66)',
    marginLeft: 14,
    marginRight: 14
  },
  actionContent: {
    borderWidth: 0.5,
    borderColor: 'rgb(230,230,230)',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    marginRight: 16
  },
  otherView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  centering: {
    justifyContent: 'center',
    alignItems: 'center',
  }
}
