import {getTableList, getTableDetail, addTable, updateTable,deleteTable} from "../services/merchant";
import {getSessionStorage} from "../utils/helper";

export default {

  namespace: 'dining',

  state: {
    count:0, //个数
    tableList:[] ,//餐桌数组,
    loading:false,
    visible:false,
    table:{},
    status:null,//当前餐桌的列表状态
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,search,state})=>{
        if(pathname.includes('/app/v1/table')) {
          //设置当前餐桌状态值
          dispatch({
            type:'changeTableStatus',
            status:state
          });
          //查询餐桌列表
          dispatch({
            type:'getTableList',
            status:state
          })
        }
      });
    },
  },

  effects: {
    *getTableList({ status }, {select, call, put }) {
       const tableStatus =  yield select(state => state.dining.status);
       yield put({type:'showLoading'});
       const {data} = yield call(getTableList, getSessionStorage("merchantId"),tableStatus);
       if(data) {
         yield put({type:'hideLoading'});
         yield put({
           type:'showTableList',
           count:data.count,
           tableList:data.data
         })
       }
    },
    *editTable({tableId}, {call,put}) {
      if(tableId!=undefined&&tableId!=null) {
        const {data} = yield call(getTableDetail, getSessionStorage("merchantId"), tableId);
        if(data) {
          yield put({
            type:'showTableDetail',
            visible:true,
            table:data.data
          })
        }
      } else {
        yield put({
          type:'showTableDetail',
          visible:true,
          table:{}
        })
      }
    },
    *saveTable({table}, {select,call,put}) {
      const tableId = yield select(state => state.dining.table.id);
      const id = getSessionStorage("merchantId");
      table.id = id;
      table.tableId = tableId;
      let isOk = false;
      if (tableId!=undefined) {
        const {data} = yield call(updateTable, table);
        isOk=data.isOk;
      } else {
        const {data} = yield call(addTable, table);
        isOk=data.isOk;
      }
      if(isOk) {
        //保存成功
        //关闭弹框
        yield put({type:'closeDialog'});
        //刷新餐桌列表
        yield put({type:'getTableList'});
      }
    },
    *deleteTable({tableId}, {call,put}) {
      const {data} = yield call(deleteTable,getSessionStorage("merchantId"),tableId);
      if(data.isOk) {
        //刷新餐桌列表
        yield put({type:'getTableList'});
      }
    }
  },

  reducers: {
    changeTableStatus(state, payload) {
      return { ...state, ...payload };
    },
    showTableList(state, payload) {
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
    showTableDetail(state,payload) {
      return {...state, ...payload};
    }
  },

};
