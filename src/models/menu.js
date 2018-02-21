import {getDishDetail, getMenu} from '../services/merchant';
import {getLocalStorage} from "../utils/helper";

export default {

  namespace: 'menu',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{

      });
    },
  },

  effects: {

  },

  reducers: {

  },

};
