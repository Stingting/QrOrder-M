import {getOrderList, updateOrder, updateOrderStatus} from '../services/merchant';
import {getSessionStorage} from "../utils/helper";

export default {

  namespace: 'order',

  state: {
      totalPerson:0,
      totalPrice:0,
      totalCount:0,
      orderList:[],
      loading:false,
      orderData:{},
      visible:false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,search,params})=>{
        if(pathname.includes("/app/v1/order")) {
          let tableId=null;
          if(params) {
            tableId=params.tableId;
          }
          dispatch({
            type:'getOrderList',
            tableId:tableId
          })
        }
      });
    }
  },

  effects: {
    *getOrderList({ tableId }, { call, put }) {
        yield put({type:'showLoading'});
        const {data} = yield call(getOrderList,getSessionStorage("merchantId"),tableId);
        if(data) {
          yield put({type:'hideLoading'});
          yield put({
            type:'showOrderList',
            orderList:data.data.list,
            totalPerson:data.data.totalPerson,
            totalPrice:data.data.totalPrice,
            totalCount:data.data.totalCount,
          })
        }
    },
    *updateOrder({orderData}, {call, put}) {
        const params = {
          id:getSessionStorage("merchantId"),
          tableId:orderData.tableId,
          orderId:orderData.id,
          personNum:orderData.personNum,
          status : orderData.status
        };
        const {data} = yield call(updateOrder,params);
        if(data) {
          if(data.isOk) {
            //关闭窗口
            yield put({type:'closeDialog'});
            //刷新订单列表
            yield put({type:'getOrderList'})
          }
        }
    },
    *updateOrderStatus({orderId,status}, {call, put}) {
      const params = {
        id:getSessionStorage("merchantId"),
        orderId:orderId,
        status: status
      };
      const {data} = yield call(updateOrderStatus,params);
      if(data) {
        if(data.isOk) {
          //刷新订单列表
          yield put({type:'getOrderList'});
        }
      }
    }
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
    closeDialog(state,payload) {
      state.visible = false;
      return {...state, ...payload};
    },
    toUpdateOrder(state, payload) {
      state.visible = true;
      state.orderData = payload.orderData;
      return {...state, ...payload};
    }
  },

};
