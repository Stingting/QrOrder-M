import {getCustomerList} from "../services/merchant";
import {getSessionStorage} from "../utils/helper";

export default {

  namespace: 'customer',

  state: {
    customerList:[]
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
      const {data} = yield call(getCustomerList, getSessionStorage("merchantId"));
      if(data) {
        yield put({
          type:'showCustomerList',
          customerList:data.data!=null?data.data:[]
        })
      }
    },
  },

  reducers: {
    showCustomerList(state, payload) {
      return { ...state, ...payload };
    }
  },

};
