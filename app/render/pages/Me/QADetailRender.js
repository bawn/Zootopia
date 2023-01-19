import React, {
  Component,
} from 'react'

import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableHighlight,
} from 'react-native'

import NavBar from '../../compents/NavbarRender'
import Styles from '../../other/Styles'
import * as Colors from '../../other/Colors'

export default class QAListRender extends Component {
  constructor(props) {
    super(props);
    var array = this._emptyArray();
    this.state = {
      answers: array
    }
  }

  render() {
    return(
      <View style={Styles.container}>
        <NavBar title={this.props.title}/>
        <ScrollView style={styles.container}>
          {this._commonQAView()}
        </ScrollView>
      </View>
    )
  }

  _commonQAView(){
    var cells = [];
    for (var i = 0; i < this.props.commonQA.length; i++) {
      var object = this.props.commonQA[i];
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
    for (var object of this.props.commonQA) {
      array.push('');
    }
    return array;
  }

  _titleAction(index){
    var object = this.state.answers[index];
    var array = this._emptyArray();
    if (!object) {
      array[index] = this.props.commonQA[index].answer;
    }
    this.setState({
      answers: array
    });
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.placeholderColor,
    paddingTop: 18,
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
}
