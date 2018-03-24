import {getOrderList, updateOrder, updateOrderStatus,getOrderDetail} from '../services/merchant';
import {getSessionStorage} from "../utils/helper";
import {routerRedux} from 'dva/router';

export default {

  namespace: 'order',

  state: {
      totalPerson:0,
      totalPrice:0,
      totalCount:0,
      orderList:[],
      loading:false,
      orderData:{},
      visible:false,
      detail:{}, //订单详情
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

        if (pathname.includes('/app/v1/order/orderdetail')) {
          console.log(`pathname=${pathname}`);
          /**
           * 获取订单详情信息
           */
          dispatch({
            type: 'getOrderDetail',
            orderId: params.orderId
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
            yield put({type:'getOrderList'});
            //刷新详情（在详情页面进行修改时）
            yield put({type:'getOrderDetail'});
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
          //刷新详情（在详情页面进行修改时）
          yield put({type:'getOrderDetail'});
        }
      }
    },
    //订单列表跳转订单详情页面
    *toOrderDetail({orderId},{call,put}) {
      yield put(routerRedux.push({
        pathname: '/app/v1/order/orderdetail',
        params: {
          orderId: orderId
        },
      }));
    },
    *getOrderDetail({orderId}, {call,put,select}) {
      const {data} = yield call (getOrderDetail,getSessionStorage("merchantId"),orderId);
      if(data) {
        yield put({
          type: 'showOrderDetail',
          detail: data.data
        })
      }
    },
    *backOrderList({}, {call,put,}) {
      yield put(routerRedux.goBack());
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
    closeDialog(state,payload) {
      state.visible = false;
      return {...state, ...payload};
    },
    toUpdateOrder(state, payload) {
      state.visible = true;
      state.orderData = payload.orderData;
      return {...state, ...payload};
    },
    showOrderDetail(state, payload) {
      return {...state, ...payload};
    }
  },

};
