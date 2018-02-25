import {getOrderList} from '../services/merchant';
import {getSessionStorage} from "../utils/helper";

export default {

  namespace: 'order',

  state: {
      totalPerson:0,
      totalPrice:0,
      totalCount:0,
      orderList:[],
      loading:false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{
        if(pathname.includes("/app/v1/order")) {
          dispatch({
            type:'getOrderList'
          })
        }
      });
    }
  },

  effects: {
    *getOrderList({ payload }, { call, put }) {
        yield put({type:'showLoading'});
        const {data} = yield call(getOrderList,getSessionStorage("merchantId"));
        if(data) {
          yield put({type:'hideLoading'});
          yield put({
            type:'showOrderList',
            orderList:data.data.list,
            totalPerson:data.totalPerson,
            totalPrice:data.totalPrice,
            totalCount:data.totalCount,
          })
        }
    },
  },

  reducers: {
    showOrderList(state, payload) {
      return { ...state, ...payload };
    },
    showLoading(state,payload) {
      state.loading=true;
      return {...state, ...payload};
    },
    hideLoading(state,payload) {
      state.loading=false;
      return {...state, ...payload};
    },
  },

};
