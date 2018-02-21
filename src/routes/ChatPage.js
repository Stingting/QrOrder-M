import React from 'react';
import {connect} from 'dva';
import MainLayout from '../components/common/MainLayout';

import {Layout} from 'antd';

const { Header, Content, Footer, Sider} = Layout;

function ChatPage({ dispatch , fetch, location, chat}) {

  return (
    <MainLayout>

    </MainLayout>
  );
}
ChatPage.propTypes = {

};
function mapStateToProps({ chat}) {
  return {chat};
}
export default connect(mapStateToProps)(ChatPage);
