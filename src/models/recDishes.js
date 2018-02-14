import {getDishDetail, getMerchantInfo} from '../services/customer';
import {getLocalStorage} from "../utils/helper";

export default {
  namespace : 'recDishes',

  state :{
    count:0, //总数
    desc:'', //商家简介
    name:'', //商家名称
    pic:[], //商家图片
    list: [{id:1, name: '红绕肉', pic:'', price:0}], //初始化推荐菜单列表
    loading : false, //控制加载状态
    detail : {}, //详情,
    detailModalVisible:false
  },
  reducers: {
    showLoading(state, payload) {
      return {...state, ...payload};
    },
    showDishList(state, payload) {
      return {...state, ...payload};
    },
    showDishDetail(state, payload) {
      return {...state, ...payload}
    },
    closeDetailDialog(state,payload) {
      state.detailModalVisible = false;
      return {...state, payload}
    }
  },
  effects: {
    //声明时需要添加*，普通函数内部不能使用yield关键字，否则会出错
    *getMerchantInfo(action, {put, call}) {
      yield put({type: 'showLoading', loading: true});
      const {data} = yield call(getMerchantInfo, getLocalStorage("merchantId"));
      // console.log(data);
      //请求成功
      if (data) {
        yield put({
          type : 'showDishList',
          loading : false,
          list : data.data,
          count:data.count,
          desc:data.desc,
          name:data.name,
          pic:data.pic
      });
      } else {
        yield put ({
          type:'showLoading',
          loading : false
        })
      }
    },

    *getDishDetail({payload:id}, {put, call}) {
      const {data} = yield call(getDishDetail, getLocalStorage("merchantId"), id);
      if(data) {
        yield put({
          type : 'showDishDetail',
          detail : data,
          detailModalVisible:true
        })
      }
    }
  }
,
  subscriptions: {
    setup({ dispatch,history }){
      //监听，当进入pathname时，触发`getMerchantInfo` action
      return history.listen(({ pathname,search})=>{
        //进入首页时触发的操作
        if(pathname.includes('/app/v1/cportal')) {
          dispatch({type: 'getMerchantInfo'});
        }
      });
    }
  },

}
