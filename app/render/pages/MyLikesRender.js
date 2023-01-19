
/*
 * 我的喜欢
 */

 import React, {
   Component,
 } from 'react'

import {
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

import Styles from '../other/Styles'
import {getToken} from '../../models/User'
import NavBar from '../compents/NavbarRender'
import GridView from 'react-native-grid-view'


const cellWidth = (Dimensions.get('window').width - 30) / 2

export default class MyLikesRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      loaded: false,
    };
  }
  componentDidMount(){
    fetch('http://api.xinpinget.com' + '/user/likeReviews' + '?token=' + getToken())
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            dataSource: responseData.result,
            loaded: true,
          });
        }
      })
      .done();
  }

  renderLoadingView () {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="small"
        />
      </View>
    );
  }

  componentWillUnmount(){

  }


  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    else {
      return(
        <View style={{flex:1, backgroundColor: 'white'}}>
          <NavBar title={this.props.title} leftAction={()=>{Actions.pop()}}/>
          <GridView
            items={this.state.dataSource}
            itemsPerRow={2}
            renderItem={this.renderItem.bind(this)}
            style={styles.listView}
            >
          </GridView>
        </View>
      )
    }
  }

  renderItem (item) {
    return (
      <View style={styles.cell} key={item._id}>
        <TouchableHighlight
          onPress={() => Actions.commodityDetail({id:item._id})}
          style={{flex: 1}}
          >
          <Image source={{uri:item.img}} style={styles.image}/>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listView: {
    flex: 1,
    padding: 5
  },
  cell: {
    flex: 1,
    height: cellWidth,
    padding: 5
  },
  image: {
    flex:1,
    borderRadius: 2,
    backgroundColor: 'rgba(244,244,244,1)'
  },
  indicator: {
    flex: 1,
    backgroundColor: 'white',
    // width: 300
    // height: 100,
  }
}
