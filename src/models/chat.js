import constant from '../config';
import mqttClient from '../utils/mqttUtil';
import {getMenu, getChatRoomInfo} from "../services/merchant";
import {getLocalStorage} from "../utils/helper";

export default {

  namespace: 'chat',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=> {
      });
    },
  },

  effects: {

  },

  reducers: {

  },

};
