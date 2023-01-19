
import React, {
  Component
} from 'react'

import {
  Text,
  View,
  Image,
} from 'react-native'

export default class RightLineView extends Component {
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
    width: 0.5,
    position:'absolute',
    bottom: 0,
    top: 0,
    right: 0,
  }
}
