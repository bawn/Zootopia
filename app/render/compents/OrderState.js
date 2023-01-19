import React, {
  Component
} from 'react'

import {
  Text,
  View,
  Image,
} from 'react-native'

import TextStyles from '../other/TextStyles'

export default class OrderState extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    orderState: React.PropTypes.string
  }
  _stateImage(state) {
    var icon = '';
    if (state === 'unpaid') {
      icon = require('../../assets/iconTradeUnpaid.png');
    }
    else if (state === 'paid') {
      icon = require('../../assets/iconTradeStocking.png');
    }
    else if (state === 'delivered') {
      icon = require('../../assets/iconTradeShipped.png');
    }
    else if (state === 'cancelled') {
      icon = require('../../assets/iconTradeCancel.png');
    }
    return <Image source={icon}></Image>;
  }
  _stateProgress(state) {
    if (state === 'unpaid') {
      return(
        <View>
          <View style={styles.horizontalView}>
            <Image source={require('../../assets/iconCheckSelected.png')}></Image>
            <View style={styles.lightGreenLine}></View>
            <Image source={require('../../assets/iconCheckNormal.png')}></Image>
            <View style={styles.lightGreenLine}></View>
            <Image source={require('../../assets/iconCheckNormal.png')}></Image>
          </View>
          <View style={[styles.horizontalView,{justifyContent:'space-between'}]}>
            <Text style={TextStyles.fifteenBRText}>{'已下单'}</Text>
            <Text style={TextStyles.fifteenGRText}>{'备货中'}</Text>
            <Text style={TextStyles.fifteenGRText}>{'已发货'}</Text>
          </View>
        </View>
      )
    }
    else if (state === 'paid') {
      return(
        <View>
          <View style={styles.horizontalView}>
            <Image source={require('../../assets/iconCheckSelected.png')}></Image>
            <View style={styles.greenLine}></View>
            <Image source={require('../../assets/iconCheckSelected.png')}></Image>
            <View style={styles.lightGreenLine}></View>
            <Image source={require('../../assets/iconCheckNormal.png')}></Image>
          </View>
          <View style={[styles.horizontalView,{justifyContent:'space-between'}]}>
            <Text style={TextStyles.fifteenBRText}>{'已下单'}</Text>
            <Text style={TextStyles.fifteenBRText}>{'备货中'}</Text>
            <Text style={TextStyles.fifteenGRText}>{'已发货'}</Text>
          </View>
        </View>
      )
    }
    else if (state === 'delivered') {
      return(
        <View>
          <View style={styles.horizontalView}>
            <Image source={require('../../assets/iconCheckSelected.png')}></Image>
            <View style={styles.greenLine}></View>
            <Image source={require('../../assets/iconCheckSelected.png')}></Image>
            <View style={styles.greenLine}></View>
            <Image source={require('../../assets/iconCheckSelected.png')}></Image>
          </View>
          <View style={[styles.horizontalView,{justifyContent:'space-between'}]}>
            <Text style={TextStyles.fifteenBRText}>{'已下单'}</Text>
            <Text style={TextStyles.fifteenBRText}>{'备货中'}</Text>
            <Text style={TextStyles.fifteenBRText}>{'已发货'}</Text>
          </View>
        </View>
      )
    }
    else if (state === 'cancelled') {
      return (
        <Text style={[{marginTop: 26}, TextStyles.sixteenBRText]}>
          {'交易已关闭'}
        </Text>
      )
    }
  }
  render() {
    return(
      <View style={styles.container}>
        {this._stateImage(this.props.orderState)}
        {this._stateProgress(this.props.orderState)}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    height: 220,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  greenLine: {
    width: 100,
    height: 2,
    backgroundColor: 'rgb(107,187,76)',
    marginBottom: 6
  },
  lightGreenLine: {
    width: 100,
    height: 2,
    backgroundColor: 'rgba(107,187,76,0.3)',
    marginBottom: 6
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6
  }
}
