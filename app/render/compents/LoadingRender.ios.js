/*
 * Loading
 */

import React, {
  Component,
} from 'react'

import {
  Text,
  View,
  Image,
  Animated,
  Easing,
} from 'react-native'


export default class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotationAnim: new Animated.Value(0)
    };
    this._startAnimation();
  }

  static propTypes = {
    visible: React.PropTypes.bool,
  }
  static defaultProps = {
    visible: false,
  }
  _startAnimation(){
    this.state.rotationAnim.setValue(0);
    Animated.timing(this.state.rotationAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear
        }).start((finish) => {
          this._startAnimation()
        });
  }
  render(){
    if (this.props.visible) {
      var animation = this.state.rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      });
      return (
        <View style={styles.container}>
          <Animated.Image
            source={require('../../assets/iconLoading.png')}
            style={{
              transform:[{
                rotate: animation
              }]
            }}
          />
        </View>
      )
    } else {
      return <View/>
    }
  }

}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
}
