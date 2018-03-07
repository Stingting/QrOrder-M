import constant from '../config';
import mqttClient from '../utils/mqttUtil';
import {getChatRecord, getChatRoomInfo} from "../services/merchant";
import {getSessionStorage,setLocalStorage, getLocalStorage,isObject} from "../utils/helper";
import moment from 'moment';
import { Button, notification, Icon } from 'antd';
import uuid from 'uuid';
import pathToRegexp from 'path-to-regexp';

const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description: <div>{msg.content}</div>,
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
  });
};

let curTableNum=null;
let topicTableNum=null;

export default {

  namespace: 'chat',

  state: {
    count:0, //	人数
    num:0,	//几号桌
    remark:'',	//备注
    words:['你好！', '迟点给你答复'],//常用短语
    sendMessages:[],
    sendContent:'', //发送的消息
    visible:false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search,state})=>{

        //进入聊天页面时触发的操作
        if(pathname.includes('/app/v1/chat')) {
          //当前聊天桌号
          curTableNum = state;
          //获取聊天室信息
          // dispatch({type: 'getChatRoomInfo'});
          //获取聊天记录
          dispatch({type: 'getChatRecord', tableNum:curTableNum});
          //进入聊天页面时清空当前桌的未读条数及减少总的未读数
          const count = getLocalStorage(`table/${curTableNum}`);
          setLocalStorage(`table/${curTableNum}`,0);
          let tableTotalUnreadCount = getLocalStorage("tableTotalUnreadCount");
          setLocalStorage("tableTotalUnreadCount",tableTotalUnreadCount-count);
        }
        mqttClient.getInstance().on('connect', function () {
          //商家订阅本店所有台的信息
          const topic = `orderSystem/${getSessionStorage("merchantId")}/+/chat`;
          console.log("connect to emqtt...");
          console.log(`订阅的主题：${topic}`);
          mqttClient.getInstance().subscribe(topic);
          mqttClient.getInstance().on('message', function (topic, message) {

            const match = pathToRegexp(`orderSystem/${getSessionStorage('merchantId')}/:tableNum/chat`).exec(topic);
            if (match) {
              topicTableNum = match[match.length - 1];
            }
            if (curTableNum === Number(topicTableNum)) {
              //设置聊天消息
              dispatch({type:'setChatMessage', chatMsg:message.toString()});
            } else {
              //缓存餐桌的未读数
              let tableUnreadCount = getLocalStorage(`table/${topicTableNum}`);
              //缓存餐桌的总的未读数
              let tableTotalUnreadCount = getLocalStorage("tableTotalUnreadCount");
              if(!isObject(tableUnreadCount)) {
                tableUnreadCount =1;
              } else {
                tableUnreadCount+=1;
              }
              if(!isObject(tableTotalUnreadCount)) {
                tableTotalUnreadCount =1;
              } else {
                tableTotalUnreadCount+=1;
              }
              setLocalStorage(`table/${topicTableNum}`, tableUnreadCount);
              setLocalStorage("tableTotalUnreadCount", tableTotalUnreadCount);
            }

          });
        });

        mqttClient.getInstance().on('close', function () {
          console.log("emqtt closed...");
        });

        mqttClient.getInstance().on("error", function (error) {
          console.log(error.toString());
        });

      });
    },
  },

  effects: {
    *getChatRoomInfo({ payload }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(getChatRoomInfo, getSessionStorage("merchantId"), getSessionStorage("tableNum"));
      yield put({
        type: 'showChatRoomInfo' ,
        count : data.count,
        num: data.num,
        remark:data.remark,
        words:data.words
      });
    },
    *getChatRecord({tableNum}, {call,put}) {
      const {data} = yield call(getChatRecord, getSessionStorage("merchantId"), tableNum);
      if (data) {
        const chatRecords = [];
        if (data.data != null && data.data.length > 0) {
          data.data.map((item, key) => (
            chatRecords.push(item.data)
          ));
          console.log(`聊天记录：${JSON.stringify(chatRecords)}`);
          yield put({
            type: 'refreshChatMsg',
            chatRecords: chatRecords
          });
        }
      }
    }
  },

  reducers: {
    showChatRoomInfo(state, payload) {
      return { ...state, ...payload };
    },
    handleSend(state, payload) {
      //添加发送内容
      const msg = {
        msgId:uuid.v4(),
        time:new Date().getTime(),
        head:getSessionStorage("head"),
        content:payload.msg,
        userId:getSessionStorage("merchantId"),
        nickName:getSessionStorage("nickName")
      };
      const sendMsg = {
        data:msg,
        dataType: "text",
        action:"say"
      };
      const topic = `orderSystem/${getSessionStorage("merchantId")}/${curTableNum}/chat`;
      console.log(`发送的主题：${topic}`);
      mqttClient.getInstance().publish(topic, JSON.stringify(sendMsg));
      //发送后清空发送文本框内容
      state.sendContent = "";
      state.visible=false;
      return{...state, ...payload};
    },
    handleInputChange(state, payload) {
      state.sendContent = payload.msg;
      return{...state, ...payload};
    },
    setChatMessage(state, payload) {
      const msg = JSON.parse(payload.chatMsg);
      if(msg) {
        state.sendMessages.push(msg.data);
      }
      return{...state, ...payload}
    },
    refreshChatMsg(state,payload) {
      const records = payload.chatRecords;
      state.sendMessages=[];
      records.map((item,key) => (
        state.sendMessages.push(item)
      ));
      return{...state, ...payload}
    },
    handleVisibleChange(state,payload) {
      state.visible = payload.visible;
      return{...state, ...payload}
    }
  },

};
