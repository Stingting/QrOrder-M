import {login} from "../services/merchant";
import {getSessionStorage, setSessionStorage} from "../utils/helper";
import {routerRedux} from 'dva/router';

export default {

  namespace: 'login',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{
        if(pathname.includes('app')&&!pathname.includes('login')) {
          //验证是否已经登录
          const token = getSessionStorage("token");
          if (token===undefined || token===null || token==='') {
            //跳转到登录页面
            dispatch({
              type:'toLoginPage'
            });
          }
        }
      });
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const {data} = yield call(login, payload);
      if(data) {
        const token = data.authorization;
        const head=data.head;
        const merchantId = data.id;
        const nickName=data.nickName;
        setSessionStorage("token", token);
        setSessionStorage("head", head);
        setSessionStorage("merchantId", merchantId);
        setSessionStorage("nickName", nickName);
        //跳转到首页
        yield put(routerRedux.push('/app/v1/mportal'));
      }
    },
    *toLoginPage({payload}, {call,put}) {
      //跳转到登录页面
      yield put(routerRedux.push('/app/v1/login'));
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
