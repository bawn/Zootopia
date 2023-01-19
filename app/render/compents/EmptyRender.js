import React, {
  Component,
} from 'react'

import {
  View,
  Image,
  Text
} from 'react-native'

import Styles from '../other/Styles'
import * as Colors from '../other/Colors'

export default class EmptyRender extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    text: React.PropTypes.string,
    image: React.PropTypes.number,
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[Styles.centerView,{backgroundColor: 'transparent'}]}>
          <Image source={this.props.image}/>
          <Text style={[Styles.fourteenGRText, styles.text]}>{this.props.text}</Text>
        </View>
      </View>
    )
  }
}

const styles ={
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text:{
    marginTop: 16,
    backgroundColor: 'transparent',
    marginBottom: 30
  }
}
