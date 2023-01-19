/*
 * 完善个人信息
 */

 import React, {
  Component,
} from 'react'

import {
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Alert,
  TouchableOpacity,
  CameraRoll,
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import realm from '../../models/realm'


import Styles from '../other/Styles'
import NavBar from '../compents/NavbarRender'
import Colors from '../compents/NavbarRender'

const locaclStyles = {
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1.5,
  },
  middleView: {
    flex: 2
  },
  bottomView: {
    flex: 1
  },
  avatar: {
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
    position:'absolute',
    borderRadius: 46
  },
  horizontalView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
  },
  textfield: {
    flex:1,
    height: 38,
    marginRight: 24,
    marginLeft: 16,
    marginBottom: 8
  },
}

export default class InputProfileRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      nickName: '',
      password: '',
    }
  }

  _avatarAction() {
    Actions.cameraRoll({getImage:(image) => this.setState({image:image})})
  }

  _completeAction() {
    const formData = new FormData();
    formData.append('image', {uri: this.state.image, name: 'image', type: 'image/jpeg'});

    fetch('http://api.xinpinget.com' + '/image/upload/single', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((responseData) => {
        const gender = 'gender=' + 'male';
        const avatar = '&avatar=' + responseData.result;
        const nickName = '&nickname=' + this.state.nickName;
        const phonePassword = '&phonePassword' + this.state.password;
        const parameters = gender + avatar + nickName + phonePassword;
        fetch('http://api.xinpinget.com' + '/user/edit' + '?token=' + this.props.userInfo.token, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          body: parameters
        })
          .then((response) => response.json())
          .then((responseData) => {
            realm.write(() => {
              realm.create('UserSchema', {
                user: this.props.userInfo.user,
                _id: this.props.userInfo._id,
                created: this.props.userInfo.created,
                token: this.props.userInfo.token,
              },true);
            });
            Actions.home();
          })
          .done();
      })
      .done();
  }

  render() {
    return (
      <View style={Styles.container}>
        <NavBar title={this.props.title} leftAction={Actions.pop}/>
        <View style={locaclStyles.topView}>
          <TouchableOpacity onPress={()=> this._avatarAction()}>
            {/* <Image source={require('../../assets/upload_image_btn.png')}></Image> */}
            <Image source={{uri:this.state.image}} style={locaclStyles.avatar}></Image>
          </TouchableOpacity>
        </View>
        <View style={locaclStyles.middleView}>
          <View style={[locaclStyles.horizontalView, {marginTop: 20}]}>
            {/* <Image source={require('../../assets/grey_user_icon.png')}/> */}
            <NickNameTextField
              onChangeText={(text) => this.setState({nickName:text})}
            />
          </View>
          <View style={[locaclStyles.horizontalView, {marginTop: 20}]}>

            <PasswordTextField
              onChangeText={(text) => this.setState({password:text})}
            />
          </View>
          <NextButton onPress={() => this._completeAction()}></NextButton>
        </View>
        <View style={locaclStyles.bottomView}>
        </View>
      </View>
    );
  }
}
