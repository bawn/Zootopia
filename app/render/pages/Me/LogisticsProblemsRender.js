import React, {
  Component,
} from 'react'

import {
  View,
  Image,
  Text,
  TouchableHighlight,
  ListView,
  NativeModules
} from 'react-native'

import {
  Actions,
} from 'react-native-router-flux'

import NavBar from '../../compents/NavbarRender'
import Styles from '../../other/Styles'
import * as Colors from '../../other/Colors'

import * as Url from '../../other/UrlCons'
import * as ImageUrl from '../../../tool/ImageUrlSize'
import Toast from 'react-native-root-toast'
import Spinner from '../../compents/LoadingRender'
import EmptyRender from '../../compents/EmptyRender'
import {getToken} from '../../../models/User'

import fetch from 'react-native-cancelable-fetch'

export default class LogisticsProblemsRender extends Component {
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

  _updateData(){
    fetch(Url.deliveredOrder() + getToken(), null, 1)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {

          if (responseData.result) {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(responseData.result),
              visible: !this.state.visible,
              empty: !responseData.result.length
            });
          }
          else {
            this.setState({
              visible: !this.state.visible,
              empty: true,
            });
          }
        }
      })
      .catch((error) =>{
        this.setState({
          visible: !this.state.visible,
          empty: true
        });
      })
    .done();
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

  renderRow(item){
    return (
      <TouchableHighlight onPress={() => {Actions.logisticsIssue({_id:item._id})}}>
        <View style={[styles.cellView, Styles.topBottomLine]}>
          <Image
            style={styles.cellImage}
            source={{uri: ImageUrl.bigSize(item.cover)}}
            >
          </Image>
          <View style={[Styles.spaceHView, {marginRight: 10, flex: 1}]}>
            <View style={{flex: 1}}>
              <View style={styles.textContent}>
                <Text style={Styles.fifteenBMText}>{item.name}</Text>
                <Text style={Styles.fifteenBRText}>{this._state(item)}</Text>
              </View>
            </View>
            <Image source={require('../../../assets/iconGrayArrowRight.png')}/>
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

  _state(item){
    var postSaleState = item.postSaleState;
    if (postSaleState.indexOf('none') !== -1) {
      return '已发货'
    }
    else if (postSaleState.indexOf('refund') !== -1) {
      return '退货中'
    }
    else{
      return '换货中'
    }
  }
}


const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.placeholderColor,
  },
  listView: {
    flex: 1,
    paddingTop: 18,
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
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginTop: 14,
    marginBottom: 16,
  },
}
