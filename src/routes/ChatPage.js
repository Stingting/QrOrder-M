import React from 'react';
import {connect} from 'dva';
import ChatHead from '../components/chat/ChatHead';
import ChatContent from '../components/chat/ChatContent';
import MessageInput from '../components/chat/MessageInput';
import MainLayout from '../components/common/MainLayout';

function ChatPage({ dispatch , fetch, location, chat}) {

  const {num, count, name,sendContent,sendMessages,words,visible} = chat;
  const chatHeadProps = {num, count, name};
  const messageInputProps = {sendContent,words,visible};
  const chatContentProps = {sendMessages};

  //监听输入框变化
  function handleChange(value) {
    dispatch({
      type: 'chat/handleInputChange',
      msg: value
    })
  }

  //发送消息
  function handleSend(msg) {
    if (msg !=='') {
      dispatch({
        type: 'chat/handleSend', //指定action,namespace+action
        msg: msg
      })
    }
  }

  function handleVisibleChange(visible) {
    dispatch({
      type : 'chat/handleVisibleChange', //指定action,namespace+action
      visible:visible
    })
  }
  return (
    <MainLayout>
      <ChatHead {...chatHeadProps}/>
      <ChatContent {...chatContentProps}/>
      <MessageInput {...messageInputProps} handleSend={handleSend} handleChange={handleChange} handleVisibleChange={handleVisibleChange}/>
    </MainLayout>
  );
}
ChatPage.propTypes = {

};
function mapStateToProps({ chat}) {
  return {chat};
}
export default connect(mapStateToProps)(ChatPage);
