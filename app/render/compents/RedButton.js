/*
 * 红色按钮
 */
import React, {
  Component,
} from 'react'

import {
  View,
  Image,
  TouchableHighlight,
  Text
} from 'react-native'

import * as Colors from '../other/Colors'

export default class RedButton extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    state: React.PropTypes.string,
    disabled: React.PropTypes.bool
  }
  static defaultProps ={
    state: '下一步',
    disabled: false
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        style={[this.props.style,{borderRadius:5}]}>
        <View {...this.props} style={[styles.container]}>
          <Text style={[styles.text, {color: this.props.disabled ? 'rgba(255,255,255,0.3)' : 'white'}]}>
            {this.props.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles ={
  container: {
    borderRadius:5,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(225,78,78)',
  },
  text: {
    fontSize: 15,
  }
}
