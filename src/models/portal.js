import {getMerchantInfo} from "../services/merchant";
import {getSessionStorage} from "../utils/helper";
import {routerRedux} from 'dva/router';
import {Toast} from "antd-mobile";

export default {

  namespace: 'portal',

  state: {
    orderList: [{capacity: 0, name: "", personNum: 0, price: 0, status: 1, time: "23:32:56"}],
    eatingNum: 0,
    eatingPerson: 0,
    emptyTable: 0,
    price: 0,
    saleOutNum: 0,
    unReadMsg: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{
          if(pathname.includes('/app/v1/mportal')) {
             //获取商家首页信息
              dispatch({
                type:'getMerchantInfo'
              })
          }
      });
    },
  },

  effects: {
    *getMerchantInfo({ payload }, { call, put }) {  // eslint-disable-line
      const merchantId = getSessionStorage("merchantId");
      if(merchantId!==null&&merchantId!==undefined) {
        const {data, err} = yield call(getMerchantInfo, getSessionStorage("merchantId"));
        if (err) {
          throw new Error(err.message);
        } else {
          if (data.msg) {
            if (data.msg != "") {
              Toast.info(data.msg);
            }
          }
          else {
            yield put({
              type: 'showMerchantInfo',
              orderList: data.data.data,
              eatingNum: data.data.eatingNum,
              eatingPerson: data.data.eatingPerson,
              emptyTable: data.data.emptyTable,
              price: data.data.price,
              saleOutNum: data.data.saleOutNum,
              unReadMsg: data.data.unReadMsg
            });
          }
        }
      }
    },
    *backToPortal({},{call,put}) {
      //跳转到首页
      yield put(routerRedux.push('/app/v1/mportal'));
    }
  },

  reducers: {
    showMerchantInfo(state, payload) {
      return { ...state, ...payload };
    },
  },

};
