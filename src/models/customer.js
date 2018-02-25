import {getCustomerList} from "../services/merchant";
import {getSessionStorage} from "../utils/helper";

export default {

  namespace: 'customer',

  state: {
    customerList:[],
    loading:false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,search,state})=>{
        if(pathname.includes('/app/v1/customer')) {
          dispatch({
            type:'getCustomerList'
          })
        }
      });
    },
  },

  effects: {
    *getCustomerList({ payload }, { call, put }) {
      yield put({type:'showLoading'});
      const {data} = yield call(getCustomerList, getSessionStorage("merchantId"));
      if(data) {
        yield put({type:'hideLoading'});
        yield put({
          type:'showCustomerList',
          customerList:data.data
        })
      }
    },
  },

  reducers: {
    showCustomerList(state, payload) {
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
