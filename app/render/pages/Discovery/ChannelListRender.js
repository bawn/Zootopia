// 频道列表

import React, {
   Component,
 } from 'react'

import {
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import Url from '../../other/UrlCons'
import Styles from '../../other/Styles'
import NavBar from '../../compents/NavbarRender'
import * as User from '../../../models/User'
import * as Colors from '../../other/Colors'

export default class ChannelList extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    }
  }

  componentDidMount(){
    fetch(Url.categoryMarket + User.getToken())
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.result),
          });
        }
      })
      .done();
  }
  render(){
    return(
      <View style={Styles.container}>
        <NavBar title={this.props.title}/>
        <ListView
          initialListSize={5}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
        />
      </View>
    )
  }
  renderRow(item, sectionID, rowID){
    return(
      <TouchableHighlight
        style={styles.cell}
        onPress={() => Actions.channelDetail({id:item._id})}
        >
        <View style={[styles.cellContent, Styles.bottomLine]}>
          <Image source={{uri: item.icon}} style={styles.cellImage}/>
          <View style={styles.cellOtherView}>
            <View style={styles.cellSummaryView}>
              <View style={styles.cellSubView}>
                <Text style={styles.cellTitle}>{item.name}</Text>
                <View style={styles.cellSubButton}></View>
              </View>
              <Text style={styles.cellSummary}>{item.summary}</Text>
            </View>
            <Text style={styles.cellInfo}>{`${item.subscribeCount} 人订阅`}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = {
  listView: {
    flex: 1,
    backgroundColor: 'white'
  },
  cell: {
    flex: 1,
    height: 166,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  cellContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingRight: 20,
    paddingTop: 25,
    paddingBottom: 25,
  },
  cellImage: {
    width: 95,
    height: 116,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(66,66,66,0.1)',
    marginRight: 20
  },
  cellTitle: {
    fontSize: 18,
    color: Colors.blackColor
  },
  cellSummary: {
    fontSize: 14,
    color: Colors.grayColor,
    fontWeight: '300',
    marginTop: 4,
  },
  cellSubView: {
    width: Dimensions.get('window').width - 20 * 2 - 25 - 95,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  cellSubButton: {
    width: 45,
    height: 26,
    backgroundColor: 'gray'
  },
  cellSummaryView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  cellOtherView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  cellInfo: {
    fontSize: 10,
    fontWeight: '100',
    color: Colors.blackColor
  }
}
