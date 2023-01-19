
import React, {
  Component
} from 'react'

import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

export default class BottomLineView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <View style={[styles.line, this.props.style]}></View>
    )
  }
}

const styles = {
  line: {
    backgroundColor: 'rgba(230,230,230,1)',
    height: StyleSheet.hairlineWidth,
    position:'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  }
}
