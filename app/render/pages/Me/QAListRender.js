import React, {
  Component,
} from 'react'

import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Platform,
} from 'react-native'

import {
  Actions,
} from 'react-native-router-flux'

import NavBar from '../../compents/NavbarRender'
import Styles from '../../other/Styles'
import * as Colors from '../../other/Colors'

const CellWidth = (Dimensions.get('window').width - 16 * 2 - 12) / 2
const Rate = 178 / 165

var QAList = require('../../../assets/QAList.json');

export default class QAListRender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor: Colors.placeholderColor}}>
        <NavBar title={this.props.title}/>
        <ScrollView style={styles.container}>
          {this._qaList()}
        </ScrollView>
      </View>
    )
  }

  _itemAction(index){
    var array = QAList[index].list;
    var title = QAList[index].title;
    Actions.qaDetail({
      commonQA: array,
      title: title
    })
  }

  _qaList(){
    var array = [];
    for (var object of QAList) {
      var icon = null;
      var index  = QAList.indexOf(object);
      switch (object.id) {
        case 1:
          icon = require('../../../assets/iconQACommodity.png');
          break;
        case 2:
          icon = require('../../../assets/iconQAOrder.png');
          break;
        case 3:
          icon = require('../../../assets/iconQALogistics.png');
          break;
        case 4:
          icon = require('../../../assets/iconQAActivity.png');
          break;
        case 5:
          icon = require('../../../assets/iconQAAftermarket.png');
          break;
        case 6:
          icon = require('../../../assets/iconQAOther.png');
          break;
        default:
      }
      array.push(
        <TouchableHighlight
          style={styles.cellView}
          key={object.id}
          onPress={this._itemAction.bind(this, index)}
          >
          <View style={[Styles.centerView, styles.contentView]}>
            <Image source={icon} style={{marginBottom: 22}}/>
            <Text style={Styles.fourteenBMText}>{object.title}</Text>
          </View>
        </TouchableHighlight>
      )
    }
    return (
      <View style={styles.flowView}>
        <View style={[Styles.centerView, styles.paddingTopView]}>
        </View>
        {array}
        <View style={[Styles.centerView, styles.paddingBottomView]}>
        </View>
      </View>
    )
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.placeholderColor
  },
  cellView: {
    width: CellWidth,
    height: CellWidth * Rate,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  contentView: {
    width: CellWidth,
    height: CellWidth * Rate,
    backgroundColor: 'white',
    borderColor: Colors.separatorColor,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  paddingTopView: {
      width: CellWidth * 2,
      height: (Platform.OS === 'ios') ? 22 : 16,
      backgroundColor: Colors.placeholderColor,
  },

  paddingBottomView: {
      width: CellWidth * 2,
      height: (Platform.OS === 'ios') ? 12 : 4,
      backgroundColor: Colors.placeholderColor,
  },

  flowView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: Colors.placeholderColor,
    alignItems: 'flex-start',
    marginLeft: 4,
  },
}
