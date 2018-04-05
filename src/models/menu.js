import {
  getMenuList, getMenuDetail, saveFood, uploadFile, deleteFood, updateFood, getClassifyList,
  deleteClassify, addClassify,getSaleoutMenu
} from '../services/merchant';
import {getSessionStorage} from "../utils/helper";
import {Toast} from "antd-mobile/lib/index";

export default {

  namespace: 'menu',

  state: {
      count:0, //总数
      menuList:[], //食物列表
      visible:false, //详情框是否可见
      food:{},//食物详情
      classify:[], //食物分类
      inputVisible:false,
      inputValue:'',
      file:'',//上传的文件
      foodType:[], //食物规格
      inputFoodTypeVisible:false,
      inputFoodTypeValue:''
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search,state})=>{
          if(pathname.includes('/app/v1/menu')) {
            //查询食物列表
            dispatch({
              type:'getMenuList',
              status:state
            })
          }
      });
    },
  },

  effects: {
    *getMenuList({ status }, { call, put }) {
        //查询售罄菜式
        if(status ===0) {
          const {data} = yield call(getSaleoutMenu, getSessionStorage("merchantId"));
          if (data) {
            yield put({
              type: 'showMenuList',
              menuList: data.data
            })
          }
        }
        else {
          const {data} = yield call(getMenuList, getSessionStorage("merchantId"));
          if (data) {
            yield put({
              type: 'showMenuList',
              count: data.count,
              menuList: data.data
            })
          }
        }
    },
    *getMenuDetail({foodId}, {call,put}) {
      if(foodId!==undefined) {
        const {data} = yield call(getMenuDetail, getSessionStorage("merchantId"), foodId);
        if(data) {
          let foodType = data.data.type.length>0?data.data.type.split(','):[];
          yield put({
            type: 'showMenuDetail',
            food: data.data,
            classify: data.data.classify === null ? [] : data.data.classify, //修改时回显菜式类型，
            foodType:foodType, //这里用foodType , 否则与type关键字冲突
            visible: true
          })
        }
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
        const c=[];
        const clas = yield select(state => state.menu.classify);
        clas.map((v, index) => {
          c.push(v.id);
        });
        food.classifyId = `[${c.join(",")}]`;
        const foodType =  yield select(state => state.menu.foodType);
        if(foodType.length>0) {
          food.type =foodType.join(",");
        }
        if (foodId===null||foodId===undefined||foodId==='') {
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
      const {data,err} = yield call(uploadFile, params);
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg != "") {
            Toast.info(data.msg);
          }
        }
        else {
          yield put({
            type: 'changeFoodPic',
            pic: data.name
          })
        }
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
    closeDialog(state,payload) {
      state.visible = false;
      return {...state, ...payload};
    },
    showMenuDetail(state,payload) {
      return {...state, ...payload};
    },
    changeFile(state,payload) {
      if(payload.changeType ==='remove') {
        state.food.pic='';
      }
      state.file=payload.file;
      return {...state, ...payload};
    },
    changeFoodPic(state,payload) {
      state.food.pic=payload.pic;
      return {...state, ...payload};
    },
    showInput(state,payload) {
      state.inputVisible = payload.inputVisible;
      return {...state, ...payload};
    },
    showFoodTypeInput(state, payload) {
      state.inputFoodTypeVisible = payload.inputFoodTypeVisible;
      return {...state, ...payload};
    },
    refreshClassify(state,payload) {
      return {...state, ...payload}
    },
    showInputValue(state, payload) {
      state.inputValue = payload;
      return {...state, ...payload}
    },
    showInputFoodTypeValue(state,paylod) {
      state.inputFoodTypeValue = paylod.inputFoodTypeValue;
      return {...state, ...paylod};
    },
    deleteFoodType(state,payload) {
      state.foodType = payload.curType;
      return {...state, ...payload};
    },
    addFoodType(state,payload) {
      state.foodType.push(payload.name);
      state.inputFoodTypeValue=payload.inputFoodTypeValue;
      state.inputFoodTypeVisible=payload.inputFoodTypeVisible;
      return {...state, ...payload};
    }
  },

};
