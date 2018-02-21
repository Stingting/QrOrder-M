import {getPayList,deleteDish} from '../services/merchant';
import {getLocalStorage} from "../utils/helper";
import {routerRedux} from 'dva/router';
import {message} from 'antd';

export default {

  namespace: 'cart',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{

      });
    }
  },

  effects: {

  },

  reducers: {

  },

};
