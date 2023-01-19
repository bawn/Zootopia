/*
 * 标签
 */

 import React, {
   Component
 } from 'react'

 import {
   Text,
   View,
   Image,
   TouchableHighlight
 } from 'react-native'


 export default class TagsView extends Component {
   constructor(props) {
     super(props)
   }
   static propTypes = {
     tags: React.PropTypes.array
   }

   render() {
     let tagViews = [];
     for (var value of this.props.tags) {
       tagViews.push(
         <Text key={this.props.tags.indexOf(value)} style={{color:'#222222', fontSize: 12, marginRight: 15}}>{value}</Text>
       )
     }
     return (
       <View style={[this.props.style, {flexDirection: 'row'}]}>
         {tagViews}
       </View>
     )
   }
 }
