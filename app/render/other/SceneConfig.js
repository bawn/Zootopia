
/*
 * 页面配置
 */

import React, {
  Component,
} from 'react'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import {
  Scene,
  Router,
  Switch,
  TabBar,
  Modal,
  Schema,
  Actions,
  ActionConst
} from 'react-native-router-flux'


import Login from "../pages/LoginRender"
import PhoneLogin from "../pages/PhoneLoginRender"
import Home from "../pages/HomeRender"
import Category from "../pages/CategoryRender"
import ChannelList from "../pages/Discovery/ChannelListRender"
import Setting from "../pages/SettingRender"
import Agreement from "../pages/AgreementRender"
import MySubscribe from '../pages/Me/MySubscribeRender'
import MyLikes from '../pages/MyLikesRender'
import CommodityDetail from '../pages/CommodityDetailRender'
import UserInfo from '../pages/UserInfoRender'
import ChannelDetail from '../pages/ChannelDetailRender'
import RegPhone from '../pages/RegPhoneRender'
import RegCheckCode from '../pages/RegCheckCodeRender'
import InputProfile from '../pages/InputProfileRender'
import CameraRoll from '../pages/CameraRollRender'
import WebView from '../pages/WebViewRender'
import Me from '../pages/Me/MeRender'
import OrderList from '../pages/OrderListRender'
import MyCouponList from '../pages/MyCouponListRender'
import OrderDetail from '../pages/OrderDetailRender'
import ExpiredCouponList from '../pages/ExpiredCouponListRender'
import RedeemCoupons from '../pages/Me/RedeemCouponsRender'
import Discovery from '../pages/Discovery/DiscoveryRender'
import TradeConfim from '../pages/Trade/TradeConfimRender'

import QAHome from "../pages/Me/QAHomeRender"
import QAList from "../pages/Me/QAListRender"
import QADetail from "../pages/Me/QADetailRender"
import RemindShipment from "../pages/Me/RemindShipmentRender"
import LogisticsProblems from "../pages/Me/LogisticsProblemsRender"
import LogisticsIssue from "../pages/Me/LogisticsIssueRender"


import TabIcon from './TabIcon'
import {getUser} from '../../models/User'

const styles = {
  container: {
    flex: 1,
    backgroundColor:
    'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: 'white',
    borderColor: 'rgb(200,200,200)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  }
}


const scenes = Actions.create(
    <Scene key="modal" component={Modal}>
        <Scene key="root" hideNavBar>
          <Scene key="login"
            component={Login}
            type={ActionConst.REPLACE}
            initial={!getUser()}
            panHandlers={null}
          />
          <Scene key="phoneLogin" component={PhoneLogin} title="登录"/>
          <Scene key="orderList" component={OrderList} title="我的订单" />
          <Scene key="mySubscribe" component={MySubscribe} title="我的订阅" />
          <Scene key="myLikes" component={MyLikes} title="我的喜欢" />
          <Scene key="webView" component={WebView} />
          <Scene key="setting" component={Setting} title="设置" />
          <Scene key="agreement" component={Agreement} title="隐私协议" />
          <Scene key="orderList" component={OrderList} title="我的订单" />
          <Scene key="channelDetail" component={ChannelDetail} title="" />
          <Scene key="commodityDetail" component={CommodityDetail} title="" />
          <Scene key="channelList" component={ChannelList} title="买手集市" />
          <Scene key="myCouponList" component={MyCouponList} title="优惠券" />
          <Scene key="expiredCouponList" component={ExpiredCouponList} title="已过期优惠券" />
          <Scene key="orderDetail" component={OrderDetail} title="订单详情" />
          <Scene key="redeemCoupons" component={RedeemCoupons} title="兑换优惠券" />
          <Scene key="tradeConfim" component={TradeConfim} title="确认订单" />
          <Scene key="qaHome" component={QAHome} title="客服与帮助"/>
          <Scene key="qaList" component={QAList} title="常见问题"/>
          <Scene key="qaDetail" component={QADetail}/>
          <Scene key="remindShipment" component={RemindShipment} title="提醒发货"/>
          <Scene key="logisticsProblems" component={LogisticsProblems} title="订单问题"/>
          <Scene key="logisticsIssue" component={LogisticsIssue} title="问题描述"/>
          <Scene key="tabbar" type={ActionConst.REPLACE} initial={getUser()}>
              <Scene
                key="main"
                tabs
                tabBarStyle={styles.tabBarStyle}
                >
                <Scene
                  key="Home"
                  component={Home}
                  title="火球买手"
                  panHandlers={null}
                  icon={TabIcon}
                  hideNavBar={true}
                />
                <Scene
                  key="Discovery"
                  component={Discovery}
                  title="发现"
                  panHandlers={null}
                  icon={TabIcon}
                  hideNavBar={true}/>
                <Scene
                  key="Me"
                  component={Me}
                  title="个人中心"
                  panHandlers={null}
                  icon={TabIcon}
                  hideNavBar={true}/>
              </Scene>
            </Scene>
        </Scene>
    </Scene>
);
export default class SceneConfig extends Component {
    render() {
        return <Router scenes={scenes} sceneStyle={{backgroundColor:'black'}}/>;
    }
}
