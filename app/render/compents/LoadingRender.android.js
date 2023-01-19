import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: this.props.visible, textContent: this.props.textContent };
  }

  static propTypes = {
    visible: React.PropTypes.bool,
    textContent: React.PropTypes.string,
    color: React.PropTypes.string,
    size: React.PropTypes.oneOf(SIZES),
    overlayColor: React.PropTypes.string
  };

  static defaultProps = {
    visible: false,
    textContent: "",
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)'
  };

  close() {
    this.setState({ visible: false });
  }

  componentWillReceiveProps(nextProps) {
    const { visible, textContent } = nextProps;
    this.setState({ visible, textContent });
  }

  _renderSpinner() {
    const { visible, textContent } = this.state;

    if (!visible)
      return (
        <View />
      );

      // var zIndex = visible ? 1000 : -1000;
      // var opacity = visible ? 1 : 0;
    // const spinner = (
    //   <View style={styles.container} key={`spinner_${Date.now()}`}>
    //     <View
    //       style={[
    //         styles.background,
    //         { backgroundColor: this.props.overlayColor }
    //       ]}>
    //       <ActivityIndicator
    //         color={this.props.color}
    //         size={this.props.size}
    //         style={{ flex: 1 }}
    //         />
    //       <View style={styles.textContainer}>
    //         <Text style={[styles.textContent, this.props.textStyle]}>{textContent}</Text>
    //       </View>
    //     </View>
    //   </View>
    // );


    return (
      // <Modal onRequestClose={() => this.close()}
        // visible={visible}
        // transparent={true}>
        // {spinner}
      // </Modal>


      <View style={styles.container} key={`spinner_${Date.now()}`}>
        <View
          style={[
            styles.background,
            { backgroundColor: this.props.overlayColor }
          ]}>
          <ActivityIndicator
            color={this.props.color}
            size={this.props.size}
            style={{ flex: 1 }}
            />
          <View style={styles.textContainer}>
            <Text style={[styles.textContent, this.props.textStyle]}>{textContent}</Text>
          </View>
        </View>
      </View>
    );

  }

  render() {
    return this._renderSpinner();
  }

}
