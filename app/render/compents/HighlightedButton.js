/*
 * 点击会呈现 highlighted 状态的按钮
 */
import React, {
  Component,
} from 'react'

import {
  Image,
  TouchableOpacity
} from 'react-native'

export default class HighlightedButton extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    highlighted: React.PropTypes.bool,
    source: React.PropTypes.number,
    highlightedSource: React.PropTypes.number,
  }
  static defaultProps ={
    highlighted: false,
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={1}
        style={this.props.style}
      >
        <Image source={this.props.highlighted ? this.props.highlightedSource : this.props.source}/>
      </TouchableOpacity>
    );
  }
}

const styles ={
  container: {
    // flex: 1,
    // position: 'absolute',
    // bottom: 0,
    // top: 0,
    // left: 0,
    // right: 0,
  }
}
