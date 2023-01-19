/*
 * 修改用户信息
 */

 import React, {
   Component,
 } from 'react'

 import {
   Text,
   View,
   Image,
   ListView,
   Dimensions,
   TouchableOpacity
 } from 'react-native'

 import {
   Actions,
   DefaultRenderer
 } from 'react-native-router-flux'

 import NavBar from '../compents/NavbarRender'
 import Styles from '../other/Styles'
 import {getToken} from '../../models/User'


 export default class UserInfoRender extends Component {
   constructor(props) {
     super(props);
     this.state = {
       avatar: null,
       nickname: null,
       submitShow: false
     };
   }

   componentWillMount(){
     // 获取token
     const token = getToken();
     fetch('http://api.xinpinget.com' + '/user/myInfo' + '?token=' + token)
       .then((response) => response.json())
       .then((responseData) => {
         if (responseData) {
           this.setState({
             nickname: responseData.result.nickname,
             avatar: responseData.result.avatar,
             image: null
           })
         }
       })
       .done();
   }


   _onLayout(event) {
    //  console.log(event.nativeEvent.layout);
     this.setState({
       layout: event.nativeEvent.layout
     })
   }
   _onChangeText(text) {
     if (text === this.state.nickname) {
       this.setState({
         submitShow: false
       })
     }
     else {
       this.setState({
         submitShow: true
       })
     }
   }


   render() {
     return (
       <View style={localStyles.container}>
        <NavBar title={this.props.title} leftAction={Actions.pop}/>
        <TouchableOpacity style={localStyles.submit} onPress={() => this._submitInfo()}>
          <Image
            source={require('../../assets/nav_check_btn.png')}
            style={{opacity: Number(this.state.submitShow)}}
            >
          </Image>
        </TouchableOpacity>
         <View style={{alignItems: 'center'}}>
           <TouchableOpacity onPress={() => Actions.cameraRoll({getImage:(image) => this.setState({image:image})})}>
           <Image
             source={{uri: this.state.image ? this.state.image : this.state.avatar}}
             style={localStyles.avatar}
             resizeMode='cover'
             >
           </Image>
           </TouchableOpacity>
         </View>
         <View style={localStyles.info} onLayout={(event) => this._onLayout(event)}>

           <TextField
             defaultValue={this.state.nickname}
             onChangeText={(text) => this._onChangeText(text)}
           />
           <TouchableOpacity>
             <Text>男 ▼</Text>
           </TouchableOpacity>
         </View>
       </View>
     );
   }
 }


 const localStyles = {
   container: {
     flex: 1,
   },
   avatar:{
     width: 80,
     height: 80,
     borderRadius: 40,
     marginTop: 50,
     marginBottom: 110
   },
   info: {
     flexDirection: 'row',
     alignItems: 'center',
     marginLeft: 24,
     marginRight: 24
   },
   topbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  menuTrigger: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  menuTriggerText: {
    color: 'lightgrey',
    fontWeight: '600',
    fontSize: 20
  },
  disabled: {
    color: '#ccc'
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  contentText: {
    fontSize: 18
  },
  dropdown: {
    width: 300,
    borderColor: '#999',
    borderWidth: 1,
    padding: 5
  },
  dropdownOptions: {
    marginTop: 30,
    borderColor: '#ccc',
    borderWidth: 2,
    width: 300,
    height: 200
  },
  submit: {
    top: 38,
    right: 20,
    position:'absolute',
  }
 }
