import {
  getMenuList, getMenuDetail, saveFood, uploadFile, deleteFood, updateFood, getClassifyList,
  deleteClassify, addClassify
} from '../services/merchant';
import {getSessionStorage} from "../utils/helper";

export default {

  namespace: 'menu',

  state: {
      count:0, //总数
      menuList:[], //食物列表
      loading:false, //等待加载样式
      visible:false, //详情框是否可见
      food:{},//食物详情
      classify:[], //食物分类
      inputVisible:false,
      inputValue:'',
      file:'',//上传的文件
      uploadLoading:false, //上传文件加载
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{
          if(pathname.includes('/app/v1/menu')) {
            //查询食物列表
            dispatch({
              type:'getMenuList'
            })
          }
      });
    },
  },

  effects: {
    *getMenuList({ payload }, { call, put }) {
        yield put({type:'showLoading'});
        const {data} = yield call(getMenuList, getSessionStorage("merchantId"));
        if (data) {
          yield put({type: 'hideLoading'});
          yield put({
            type: 'showMenuList',
            count: data.count,
            menuList: data.data
          })
        }
    },
    *getMenuDetail({foodId}, {call,put}) {
      if(foodId!=undefined) {
        const {data} = yield call(getMenuDetail, getSessionStorage("merchantId"), foodId);
        yield put({
          type: 'showMenuDetail',
          food: data.data,
          visible: true
        })
      } else {
        //添加-获取默认食物分类
        const {data} = yield call(getClassifyList,getSessionStorage("merchantId"));
        yield put({
          type: 'showMenuDetail',
          food:{},
          visible: true,
          classify:data.data
        })
      }
    },
    *saveFood({food}, {select,call,put}) {
        food.id = getSessionStorage("merchantId");
        const foodId = yield select(state => state.menu.food.id);
        console.log(`foodId=${foodId}`)
        food.foodId=foodId;
        let isOk=false;
        if (foodId===null||foodId==undefined||foodId=='') {
          const c=[];
          const clas = yield select(state => state.menu.classify);
          clas.map((v, index) => {
            c.push(v.id);
          });
          food.classifyId = `[${c.join(",")}]`;
          const {data} = yield call(saveFood, food);
          isOk=data.isOk;
        } else {
          const {data} = yield call(updateFood, food);
          isOk=data.isOk;
        }
        if(isOk) {
          //保存成功
          //关闭弹框
          yield put({type:'closeDialog'});
           //刷新菜单列表
          yield put({type:'getMenuList'});
        }
    },
    *uploadFile({payload}, {select,call,put}) {
      const file = yield select(state => state.menu.file);
      const params ={
        file:file,
        userId:getSessionStorage("merchantId")
      };
      yield put({type:'showUploadLoading'});
      const {data} = yield call(uploadFile, params);
      if(data) {
        yield put({type:'hideUploadLoading'});
        yield put({
          type: 'changeFoodPic',
          pic: data.name
        })
      }
    },
    *deleteFood({foodId},{call,put}) {
      const {data} = yield call(deleteFood,foodId,getSessionStorage("merchantId"));
      if(data.isOk) {
        //关闭弹框
        yield put({type:'closeDialog'});
        //刷新菜单列表
        yield put({type:'getMenuList'});
      }
    },
    *deleteClassify({classifyId},{call,put}) {
      const {data} = yield call(deleteClassify,getSessionStorage("merchantId"),classifyId);
      if(data.isOk) {
        console.log("删除分类成功！");
        const {data} = yield call(getClassifyList,getSessionStorage("merchantId"));
        yield put({
          type:'refreshClassify',
          classify:data.data
        })
      }
    },
    *addClassify({name}, {call,put}) {
      const params = {
        name:name,
        id:getSessionStorage("merchantId")
      };
      const {data} = yield call(addClassify,params);
      if(data.isOk) {
        const {data} = yield call(getClassifyList,getSessionStorage("merchantId"));
        yield put({
          type:'refreshClassify',
          classify:data.data,
          inputValue:'',
          inputVisible:false
        })
      }

    }
  },

  reducers: {
    showMenuList(state, payload) {
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
    showMenuDetail(state,payload) {
      return {...state, ...payload};
    },
    changeFile(state,payload) {
      state.file=payload.file;
      return {...state, ...payload};
    },
    changeFoodPic(state,payload) {
      state.food.pic=payload.pic;
      return {...state, ...payload};
    },

    showUploadLoading(state,payload) {
      state.uploadLoading=true;
      return {...state, ...payload};
    },
    hideUploadLoading(state,payload) {
      state.uploadLoading=false;
      return {...state, ...payload};
    },
    showInput(state,payload) {
      state.inputValue = payload.inputValue;
      return {...state, ...payload};
    },
    refreshClassify(state,payload) {
      return {...state, ...payload}
    },
    showInputValue(state, payload) {
      state.inputValue = payload;
      return {...state, ...payload}
    }
  },

};
