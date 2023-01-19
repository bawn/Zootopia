import React, {
  Component,
} from 'react'

import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  NativeModules,
  InteractionManager,
  Platform
} from 'react-native'

import {
  Actions,
} from 'react-native-router-flux'

import NavBar from '../../compents/NavbarRender'
import Styles from '../../other/Styles'
import * as Colors from '../../other/Colors'

var commonQA = require('../../../assets/CommonQA.json');


export default class QAHomeRender extends Component {
  constructor(props) {
    super(props);
    var array = this._emptyArray();
    this.state = {
      answers: array,
      messageNumber: this.props.messageNumber
    }
  }

  _commonQAView(){
    var cells = [];
    for (var i = 0; i < commonQA.length; i++) {
      var object = commonQA[i];
      var answer = this.state.answers[i];
      var answerView = this._answerView(answer);
      cells.push(
        <View style={{backgroundColor: 'white'}} key={object.id}>
          <TouchableHighlight onPress={this._titleAction.bind(this, i)}>
            <View style={[Styles.spaceHView, styles.titleView, Styles.topLine]}>
              <Text style={Styles.fourteenBRText}>{object.title}</Text>
              <Image
                source={require('../../../assets/iconAllowdown.png')}
                style={{transform:[{rotate: answer ? '180deg' : '0deg'}]}}
              />
            </View>
          </TouchableHighlight>
          <View>
            {answerView}
          </View>
        </View>
      )
    }
    return cells;
  }

  _answerView(answer) {
    if (answer) {
      return(
        <View style={Styles.topLine}>
          <Text style={[Styles.fourteenBLText, styles.answerText]}>{answer}</Text>
        </View>
      )
    }
    return null;
  }

  _emptyArray(){
    var array = [];
    for (var object of commonQA) {
      array.push('');
    }
    return array;
  }

  _titleAction(index){
    var object = this.state.answers[index];
    var array = this._emptyArray();
    if (!object) {
      array[index] = commonQA[index].answer;
    }
    this.setState({
      answers: array
    });
  }

  _onlineServiceAction(){

  }
  _numberView(){
    if (this.state.messageNumber > 0) {
      return(
        <View style={styles.numberView}>
          <Text style={styles.numberText}>{this.state.messageNumber}</Text>
        </View>
      )
    }
    return null;
  }

  render() {
    return(
      <View style={Styles.container}>
        <NavBar title={this.props.title}/>
        <ScrollView style={{backgroundColor: Colors.placeholderColor}}>
          <View style={[Styles.horizontalView, {height: 52, paddingLeft: 13}]}>
            <Image source={require('../../../assets/iconSelfService.png')}/>
            <Text style={[Styles.fifteenBRText, {marginLeft: 13}]}>{'自助服务'}</Text>
          </View>
          <View style={[Styles.spaceHView,Styles.topBottomLine,styles.iconView]}>
            <TouchableOpacity onPress={() => { Actions.remindShipment() }}>
              <View style={Styles.verticalView}>
                <Image source={require('../../../assets/iconRemindShipment.png')}/>
                <Text style={[Styles.fourteenBMText, {marginTop: 10}]}>{'提醒发货'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {Actions.logisticsProblems()}}>
              <View style={Styles.verticalView}>
                <Image
                  style={{width:70, height:70}}
                  source={require('../../../assets/iconQAOrder.png')}/>
                <Text style={[Styles.fourteenBMText, {marginTop: 10}]}>{'订单问题'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this._onlineServiceAction()}}>
              <View style={Styles.verticalView}>
                <Image source={require('../../../assets/iconOnlineService.png')}/>
                <Text style={[Styles.fourteenBMText, {marginTop: 10}]}>{'在线客服'}</Text>
                {this._numberView()}
              </View>
            </TouchableOpacity>
          </View>
          <View style={[Styles.horizontalView, styles.qaView, Styles.topLine]}>
            <Image source={require('../../../assets/iconQA.png')}/>
            <Text style={[Styles.fifteenBRText, {marginLeft: 13}]}>{'常见问题'}</Text>
          </View>
          {this._commonQAView()}
          <TouchableOpacity onPress={()=>{Actions.qaList()}}>
            <View style={[Styles.centerView, styles.moreView]}>
              <Text style={Styles.twelveGRText}>{'更多常见问题'}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  iconView:{
    height: 150,
    paddingLeft: 29,
    paddingRight: 29,
  },
  qaView: {
    height: 52,
    paddingLeft: 13,
    marginTop: 18
  },
  answerText: {
    lineHeight: 24,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 11,
    marginBottom: 11,
    color: Colors.grayColor
  },
  titleView:{
    height: 52,
    paddingLeft: 16,
    paddingRight: 10,
  },
  moreView:{
    backgroundColor:'transparent',
    padding: 16
  },
  numberView:{
    position: 'absolute',
    top: 8,
    right: 0,
    backgroundColor: Colors.redColor,
    height: 18,
    justifyContent: 'center',
    borderRadius: 9,
  },
  numberText:{
    fontSize: 10,
    color: 'white',
    marginLeft: 6.5,
    marginRight: 6.5
  }
}
