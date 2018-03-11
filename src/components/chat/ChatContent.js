import React from 'react';
import {List,Avatar} from 'antd'
import styles from './Chat.less';
import {getSessionStorage} from "../../utils/helper";
import moment from 'moment';

const ChatContent = ({sendMessages}) => {
  window.addEventListener('scroll', function () {
    var obj = document.getElementById('chatContent');
   /* console.log('come?'+ obj.offsetTop - document.body.scrollTop);
    if (obj.offsetTop - document.body.scrollTop <= 0) {
      // obj.style.bottom = '-100px';
      obj.scrollTop = document.body.scrollTop;
    }*/
  });

  const content = sendMessages.map((item,key) => (
    <div key={key}>
      <div className={styles["chat-thread"]}>
        <div className={item.userId ===getSessionStorage("merchantId")?styles["head-right"]:styles["head-left"]}><Avatar src={item.head}/></div>
        <div className={item.userId ===getSessionStorage("merchantId")?styles["content-right"]:styles["content-left"]}>{item.content}</div>
        <div className={styles.time}>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
    </div>
  ));
  return (
    <div className={styles["chat-content"]} id='chatContent'>
      {content}
    </div>
  );
};

export default ChatContent;
