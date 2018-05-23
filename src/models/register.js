import {register} from "../services/merchant";
import {routerRedux} from 'dva/router';
import {Toast} from 'antd-mobile';

export default {

  namespace: 'register',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{

      });
    },
  },

  effects: {
    *register({ payload }, { call, put }) {
      const {data,err} = yield call(register, payload);
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg != "") {
            Toast.info(data.msg);
          }
        }
        else {
          Toast.info("注册成功！");
          //跳转到登录页面
          yield put(routerRedux.push('/app/v1/login'));
        }
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
