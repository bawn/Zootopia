/*
 * 相册
 */

 import React, {
   Component,
 } from 'react'

 import {
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
  CameraRoll,
  Dimensions
 } from 'react-native'

 import {
  Actions,
  Router
 } from 'react-native-router-flux'

 // import GridView from 'react-native-grid-view'
 import Styles from '../other/Styles'
 import NavBar from '../compents/NavbarRender'
 const cellWidth = (Dimensions.get('window').width - 6) / 4

export default class CameraRollRender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: null,
      loaded: false,
    };
  }

  componentDidMount(){
    const fetchParams = {
        first: 16
    };
    CameraRoll.getPhotos(fetchParams)
      .then((data) => this._appendAssets(data), (e) => logError(e))
  }

  _appendAssets(data) {
    var assets = data.edges
    const images = assets.map((asset) => asset.node.image)
    this.setState({
      dataSource: images,
      loaded: true,
    });
  }

  renderLoadingView () {
    return (
      <View style={localStyles.loadingView}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    else {
      return(
        <View style={Styles.container}>
          <NavBar title={this.props.title} imageType={'Modal'} leftAction={()=>{Actions.pop()}}/>
          {/* <GridView
            items={this.state.dataSource}
            itemsPerRow={4}
            renderItem={this.renderItem.bind(this)}
            style={localStyles.listView}
            >
          </GridView> */}
        </View>
      )
    }
  }

  _selectImage(item){
    this.props.getImage(item);
    Actions.pop();
  }

  renderItem (item) {
    return (
      <TouchableOpacity onPress={()=>this._selectImage(item.uri)} key={item.uri}>
        <View style={localStyles.cell}>
          <Image source={{uri:item.uri}} style={localStyles.image}/>
        </View>
      </TouchableOpacity>
    )
  }
}

const localStyles = {
  listView: {
    flex: 1,
    marginLeft: -2
  },
  cell: {
    height: cellWidth,
    width: cellWidth,
    marginLeft: 2,
    marginTop: 2
  },
  image: {
    flex:1,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
