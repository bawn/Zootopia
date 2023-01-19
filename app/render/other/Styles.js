
import React, {
  Component,
} from 'react'

import {
  Platform,
  StyleSheet
} from 'react-native'

import * as Colors from './Colors'

export default {
  container: {
    flex: 1,
    backgroundColor: '#F3F5F6',
  },
  bottomLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor : Colors.separatorColor
  },
  topLine: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor : Colors.separatorColor
  },
  topBottomLine: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.separatorColor,
  },
  text: {
    color: '#212121',
    fontSize: 16
  },
  horizontalView: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  spaceHView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  spaceVView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceBetweenView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  marginLR: {
    marginLeft: 16,
    marginRight: 16
  },
  MGRText: {
    color: 'rgb(171,171,171)',
    fontSize: 14,
  },
  MBRText: {
    color: 'rgb(66,66,66)',
    fontSize: 14,
  },
  SBLText: {
    color: 'rgb(66,66,66)',
    fontSize: 12,
    fontWeight: '100'
  },
  LBRText: {
    color: 'rgb(66,66,66)',
    fontSize: 16,
  },
  LBMText: {
    color: 'rgb(66,66,66)',
    fontSize: 16,
    // fontWeight: (Platform.OS === 'ios') ? 'bold' : 'normal',
  },
  LGRText: {
    color: 'rgb(171,171,171)',
    fontSize: 16,
  },
  SGRText: {
    color: 'rgb(171,171,171)',
    fontSize: 12,
    // fontWeight: '600'
  },
  XLBRText: {
    color: 'rgb(66,66,66)',
    fontSize: 20,
  },
  MBLText: {
    color: 'rgb(66,66,66)',
    fontSize: 14,
    // fontWeight: '600'
  },
  SGMText: {
    color: 'rgb(171,171,171)',
    fontSize: 12,
  }
}
