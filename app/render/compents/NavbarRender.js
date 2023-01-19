
/*
 * 导航栏
 */

import React, {
  Component,
} from 'react'

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import BottomLineView from '../compents/BottomLineView'

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    title: React.PropTypes.string,
    leftAction: React.PropTypes.func,
    rightAction: React.PropTypes.func,
    hideBackButton: React.PropTypes.bool,
    rightTitle: React.PropTypes.string,
    type: React.PropTypes.oneOf(['none','share','text']),
    rightButtonDisable: React.PropTypes.bool,
  }
  static defaultProps = {
    type: 'none',
    text: '',
    rightButtonDisable: false,
  }
  _leftAction(){
    if (this.props.leftAction()) {
      this.props.leftAction()
    }
    else {
      Actions.pop()
    }
  }
  _rightAction(){
    if (this.props.rightAction()) {
      this.props.rightAction()
    }
    else {
      Actions.pop()
    }
  }

  render(){
    return(
      <View style={[styles.container, this.props.style]}>
        <View style={styles.topView}/>
        <View style={styles.content}>
          {this._titleView()}
          {this._leftView()}
          {this._rightView(this.props.type)}
        </View>
        <BottomLineView></BottomLineView>
      </View>
    )
  }

  _titleView(){
    return(
      <View style={styles.titleView}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    )
  }

  _leftView(){
    return(
      <TouchableOpacity
      onPress={()=>{Actions.pop()}}
      style={styles.backImage}
      >
        {!this.props.hideBackButton?<Image source={require('../../assets/iconBackDefault.png')}></Image>:null}
      </TouchableOpacity>
    )
  }
  _rightView(type){
    var icon = '';
    if (type === 'none') {
      return null;
    }
    else if (type === 'share') {
      icon = require('../../assets/iconShare.png');
    }
    else if (type === 'text') {
      return(
        <TouchableOpacity
          onPress={()=>{this.props.rightAction()}}
          style={styles.rightImage}
          disabled={this.props.rightButtonDisable}
        >
          <Text style={{backgroundColor: 'white'}}>{this.props.rightTitle}</Text>
        </TouchableOpacity>
      )
    }
    return(
      <TouchableOpacity
        onPress={()=>{this.props.rightAction()}}
        style={styles.rightImage}
      >
        <Image source={icon}></Image>
      </TouchableOpacity>
    )
  }
}

const styles = {
  container: {
    height: (Platform.OS === 'ios') ? 64 : 76,
    backgroundColor: 'white',
  },
  topView: {
    height: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    // height: (Platform.OS === 'ios') ? 44 : 56,
  },
  title: {
    fontSize: 17,
    fontWeight: '600'
  },
  backImage: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  rightImage: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  titleView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
}
