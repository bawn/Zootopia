
/*
 * 订阅按钮
 */
import React, {
  Component,
} from 'react'

import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'

import {lightGrayColor} from '../other/Colors'
import {redColor} from '../other/Colors'

export default class SubscribeButton extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    onPress: React.PropTypes.func,
    select: React.PropTypes.bool
  }
  static defaultProps ={
    select: false
  }

  render() {
    var icon = this.props.select ? require('../../assets/iconSubscribeSelected.png') : require('../../assets/iconSubscribeNormal.png');
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View {...this.props} style={[styles.container, this.props.style,{backgroundColor: this.props.select ? lightGrayColor : redColor}]}>
          <Image source={icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles ={
  container: {
    borderRadius:3,
    width: 48,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
