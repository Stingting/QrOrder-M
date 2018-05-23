import {login} from "../services/merchant";
import {getSessionStorage, setSessionStorage,isObject} from "../utils/helper";
import {routerRedux} from 'dva/router';
import {Toast} from 'antd-mobile';

export default {

  namespace: 'login',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{
        if(pathname.includes('app')&&!pathname.includes('login')) {
          //验证是否已经登录
          const token = getSessionStorage("token");
          if (!isObject(token)&&!pathname.includes('register')) {
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
      const {data,err} = yield call(login, payload);
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg != "") {
            Toast.info(data.msg);
          }
        }
        else {
          const token = data.authorization;
          const head = data.head;
          const merchantId = data.id;
          const nickName = data.nickName;
          setSessionStorage("token", token);
          setSessionStorage("head", head);
          setSessionStorage("merchantId", merchantId);
          setSessionStorage("nickName", nickName);
          //跳转到首页
          yield put(routerRedux.push('/app/v1/mportal'));
        }
      }
    },
    *toLoginPage({payload}, {call,put}) {
      //跳转到登录页面
      yield put(routerRedux.push('/app/v1/login'));
    },
    *toRegisterPage({payload}, {call, put}) {
      //跳转到注册页面
      yield put(routerRedux.push('/app/v1/register'));
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
