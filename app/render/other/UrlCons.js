
const baseUrl = 'http://api.xinpinget.com'
const dailyBaseUrl = 'http://daily.api.xinpinget.com'
var url = baseUrl

export default {
  paidOrderList: url + '/order/list?state=paid&token=',
  urgentOrder: url +'/order/urgent/',
  deliveredOrder: url +'/order/list?state=delivered&token=',
  issueOrder: url +'/order/issue/',
  categoryMarket: url + '/category/market?token=',
  orderConfirm: url + '/charge/order/confirm?token=',
  orderCreate: url + '/charge/order/create?token='
};
