
import React, {
  Component
} from 'react'

import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

export default class TopLineView extends Component {
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
    top: 0,
    right: 0,
  }
}
