import React from 'react';
import {Input, Icon, Button,Form,Popover} from 'antd';
import styles from './Chat.less';
const FormItem = Form.Item;

const MessageInput = ({sendContent, handleSend, handleChange,words,visible,handleVisibleChange}) => {
  const content = words.map(d => <p className={styles["quick-send"]} onClick={()=>handleSend(d)}>{d}</p>);
  return (
    <div className={styles["chat-input"]}>
      <div className={styles.input}>
        <Input placeholder="Enter your message"
               value={sendContent}
               onChange={(e) => handleChange(e.target.value)}
               onPressEnter={() => handleSend(sendContent)}/>
      </div>
      <div className={styles["quick-send"]}>
        <Popover content={content} trigger="click" visible={visible} onVisibleChange={(e) => handleVisibleChange(e)}>
          <Button type="primary" size="small">快速回复</Button>
        </Popover>
      </div>
      <div className={styles.btn}>
        <Button type="primary" size="small" onClick={() => handleSend(sendContent)}>发送</Button>
      </div>
    </div>
  );
};

export default MessageInput;
