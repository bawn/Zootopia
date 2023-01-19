/*
 * 过期的优惠券
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
  TouchableOpacity
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import Styles from '../other/Styles'
import {getToken} from '../../models/User'
import NavBar from '../compents/NavbarRender'

export default class ExpiredCouponListRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }
  componentWillMount(){
    fetch('http://api.xinpinget.com' + '/user/deprecatedCoupons' + '?token=' + getToken())
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
          enableEmptySections={true}
          >
        </ListView>
      </View>
    )
  }

  renderRow(item){
    return(
      <View style={{flex: 1, opacity: 0.5}}>
        <View style={styles.contentView}>
          <View style={styles.topView}>
            <View style={styles.horizontal}>
              <Text style={styles.title}>{item.rebate.value}</Text>
              <Text style={styles.unitText}>{' 元'}</Text>
            </View>
            <Image source={require('../../assets/bgSealNormal.png')} style={styles.seal}/>
          </View>
          <View style={styles.line}/>
          <Text style={styles.subTitle}>{item.useCondition}</Text>
            <View style={styles.bottomView}>
              <Text style={styles.date}>{item.from.substring(0,10) + ' - ' + item.to.substring(0,10)}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: item.usageIcon}} style={styles.avatar}/>
                <Text style={styles.usage}>{item.usage}</Text>
              </View>
            </View>
        </View>
      </View>
    )
  }
}

const styles = {
  listView: {
    flex: 1,
    paddingTop: 10,
  },
  contentView: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 10
  },
  rowImage: {
    flex:1,
    borderRadius: 2
  },
  line: {
    height: 0.5,
    backgroundColor: 'rgba(230,230,230,1)',
    marginLeft: 16,
    marginRight: 16
  },
  unitText: {
    fontSize: 14,
    color: 'rgba(66,66,66,1)',
    marginBottom: 10
  },
  horizontal: {
    flexDirection : 'row',
    alignItems: 'flex-end'
  },
  topView:{
    flexDirection : 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 50,
    color: 'rgba(66,66,66,1)',
    marginLeft: 16,
    marginTop: 12,
    fontWeight: '300'
  },
  subTitle: {
    fontSize: 12,
    color: 'rgb(66,66,66)',
    marginLeft: 16,
    marginTop: 16,
  },
  date: {
    fontSize: 12,
    color: 'rgb(171,171,171)',
    marginLeft: 16,
    marginTop: 16,
  },
  avatar: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  bottomView: {
    flexDirection : 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  usage: {
    fontSize: 12,
    color: 'rgb(66,66,66)',
    marginLeft: 5,
    marginRight: 16
  },
  seal: {
    width: 80,
    height: 58
  }
}
