
import React, {
  PropTypes,
} from 'react'


import {
  Text,
  Image,
  View,
} from 'react-native'

import TopLineView from '../compents/TopLineView'

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  // key: PropTypes.string
}

const TabIcon = (props) => {
  var tabbarIcon = require('../../assets/tabbarHomeNormal.png');
  if (props.title === '火球买手') {
    tabbarIcon = props.selected ? require('../../assets/tabbarHomeSelected.png') : require('../../assets/tabbarHomeNormal.png')
  }
  else if (props.title === '发现') {
    tabbarIcon = props.selected ? require('../../assets/tabbarDiscoverySelected.png') : require('../../assets/tabbarDiscoveryNormal.png')
  }
  else if (props.title === '个人中心') {
    tabbarIcon = props.selected ? require('../../assets/tabbarMeSelected.png') : require('../../assets/tabbarMeNormal.png')
  }
  return (
    <View style={styles.container}>
      <Image source={tabbarIcon}/>
    </View>
  )
};

TabIcon.propTypes = propTypes;

export default TabIcon;

const styles = {
  container: {
    backgroundColor: 'white'
  },
}
