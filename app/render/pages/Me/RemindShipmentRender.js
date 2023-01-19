import React, {
  Component,
} from 'react'

import {
  View,
  Image,
  Text,
  ListView,
  Platform,
  TouchableHighlight,
} from 'react-native'

import NavBar from '../../compents/NavbarRender'
import Styles from '../../other/Styles'
import * as Colors from '../../other/Colors'

import Url from '../../other/UrlCons'
import * as ImageUrl from '../../../tool/ImageUrlSize'
import Toast from 'react-native-root-toast'
import Spinner from '../../compents/LoadingRender'
import EmptyRender from '../../compents/EmptyRender'
import {getToken} from '../../../models/User'

import fetch from 'react-native-cancelable-fetch'

export default class RemindShipmentRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      empty: false
    }
  }
  componentDidMount(){
    this._updateData();
  }
  componentWillUnmount(){
    fetch.abort(1);
  }

  _contentView(){
    if (this.state.empty) {
      return(
        <EmptyRender
          image={require('../../../assets/iconOrderEmpty.png')}
          text={'你还没有订单喔'}
        />
      )
    }
    else {
      return(
        <ListView
          initialListSize={8}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
          style={styles.listView}
          enableEmptySections={true}
        />
      )
    }
  }
  render() {
    return(
      <View style={Styles.container}>
        <NavBar title={this.props.title}/>
        <View style={styles.container}>
          {this._contentView()}
          <Spinner
            visible={this.state.visible}
            size='small'
            color={Colors.grayColor}
            overlayColor='transparent'
          />
        </View>
      </View>
    )
  }

  _remindButtonAction(item){
    this._remindAction(item).then((data) => {
      this._updateData();
    });
  }

  _remindAction(item){
    return new Promise((resolve, reject) => {
      fetch(Url.urgentOrder() + item._id + '?token=' + getToken(), {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then((response) => response.json())
      .then((json) => {
        Toast.show(' 提醒发货成功啦！', {
          duration: 200,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          onHidden: () => {
            resolve(json);
          }
        });
      })
      .catch((error) =>{

      })
      .done();
    });
  }

  _updateData(){

    fetch(Url.paidOrderList + getToken(), null, 1)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          if (responseData.result) {

            // InteractionManager.runAfterInteractions(() => {
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.result),
                visible: false,
                empty: !responseData.result.length
              });
            // });

          }
          else {
            this.setState({
              visible: false,
              empty: true
            });
          }
        }
      })
      .catch((error) =>{
        this.setState({
          visible: false,
          empty: true
        });
      })
    .done();
  }

  renderRow(item){
    var textColor = {color: item.urgent ? Colors.grayColor : Colors.blackColor};
    return (
      <TouchableHighlight>
        <View style={[styles.cellView,Styles.topBottomLine]}>
          <Image
            style={styles.cellImage}
            source={{uri: ImageUrl.bigSize(item.cover)}}
            >
          </Image>
          <View style={styles.textContent}>
            <Text style={Styles.fifteenBMText} numberOfLines={1}>{item.name}</Text>
            <View style={[Styles.spaceHView, {marginTop: 30}]}>
              <Text style={Styles.fifteenBRText}>{'备货中'}</Text>
              <TouchableHighlight
                style={{borderRadius: 15}}
                onPress={()=>{this._remindButtonAction(item)}}
                disabled={item.urgent}
              >
                <Text
                  style={[styles.actionText, textColor]}>
                  {item.urgent ? '已提醒' : '提醒发货'}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return(
      <View key={`{sectionID}-${rowID}`} style={styles.separator}/>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.placeholderColor
  },
  listView: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'transparent',
    zIndex: 0
  },
  cellView: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  separator: {
    height: 18,
    backgroundColor: Colors.placeholderColor,
  },
  cellImage: {
    backgroundColor: 'white',
    width: 98,
    height: 98,
    marginTop: 0,
    marginBottom: 0,
  },
  textContent: {
    flex: 1,
    marginLeft: 16,
    marginTop: 14,
    marginRight: 12
  },
  borderView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
  	borderColor: '#dddddd',
    borderWidth: 0.5,
    backgroundColor: 'white'
  },
  actionText: {
    paddingTop: (Platform.OS === 'ios') ? 8.5 : 0,
    width: (Platform.OS === 'ios') ? 76 : 72,
    fontSize: 12,
    height: (Platform.OS === 'ios') ? 30 : 28,
    borderRadius: 15,
  	borderColor: '#dddddd',
    borderWidth: 0.5,
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',// android
  }
}
