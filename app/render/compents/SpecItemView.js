import React, {
  Component
} from 'react'

import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import * as Colors from '../other/Colors'

export default class SpecItemView extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    text: React.PropTypes.string,
    selected: React.PropTypes.bool,
    onPress: React.PropTypes.func
  }
  render() {
    var borderColor = {borderColor: this.props.selected  ? Colors.redColor : Colors.separatorColor};
    var backgroundColor = {backgroundColor: this.props.selected ? 'rgb(255,246,246)' : 'white'};
    var textColor = {color: this.props.selected ? Colors.redColor : Colors.blackColor};
    return(
      <TouchableOpacity
        style={[styles.itemView, borderColor, backgroundColor]}
        onPress={this.props.onPress}
        activeOpacity={1}
      >
        <View>
          <Text style={[styles.text, textColor]}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  text: {
    // flex: 1,
    marginLeft: 16,
    marginRight: 16,
    fontSize: 13,
  },
  itemView: {
    borderRadius: 4,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 16,
  }
}
