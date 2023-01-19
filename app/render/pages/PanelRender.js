/*
 * 左侧菜单
 */

 import React, {
   Component,
 } from 'react'

import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'

import {
  MKButton,
} from 'react-native-material-kit'

const Button = MKButton.coloredButton()
  .withBackgroundColor('#212121')
  .withRippleColor('rgba(255,255,255,0.2)')
  .build();

export default class PanelRender extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    nickname: React.PropTypes.string,
  };
  static defaultProps = {
    nickname: '匿名',
  };

  render(){
    return (
      <View style={localStyles.controlPanel}>

        <View style={localStyles.info}>
          <TouchableOpacity onPress={this.props.atatarAction}>
            <Image source={{uri:this.props.avatar}} style={localStyles.avatar}/>
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize:16}}>{this.props.nickname}</Text>
        </View>
        <View style={localStyles.content}>
        <Button onPress={this.props.closeDrawer} style={localStyles.button}>
          <Image source={require('../../assets/landingpage_icon.png')}/>
          <Text style={localStyles.text}>
            首页
          </Text>
          <Image source={require('../../assets/intoarrow_icon.png')}/>
        </Button>

        <Button onPress={this.props.mySubscribeAction} style={localStyles.button}>
          <Image source={require('../../assets/follow_icon.png')}/>
          <Text style={localStyles.text}>
            我的订阅
          </Text>
          <Image source={require('../../assets/intoarrow_icon.png')}/>
        </Button>

        <Button onPress={this.props.myLikesAction} style={localStyles.button}>
          <Image source={require('../../assets/like_icon.png')}/>
          <Text style={localStyles.text}>
            我喜欢
          </Text>
          <Image source={require('../../assets/intoarrow_icon.png')}/>
        </Button>

        <Button onPress={this.props.settingAction} style={localStyles.button}>
          <Image source={require('../../assets/setting_icon.png')}/>
          <Text style={localStyles.text}>
            设置
          </Text>
          <Image source={require('../../assets/intoarrow_icon.png')}/>
        </Button>
        </View>
        <View style={localStyles.bottom}/>
      </View>
    )
  }
}

const localStyles = {
  controlPanel: {
    flex: 1,
    backgroundColor:'#212121',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginRight: 24,
    marginLeft: 24
  },
  button: {
    shadowOpacity: 0,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  info: {
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 3,
    justifyContent: 'center',
  },
  bottom: {
    flex: 2
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  }
}
