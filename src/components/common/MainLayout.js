import React from 'react';
import MenuBanner from './MenuBanner';
import {Badge, Layout, Modal} from 'antd';
import styles from '../../assets/less/global.less';
import {connect} from "dva";
import OrderMsg from '../order/OrderMsg';
import { ActivityIndicator } from 'antd-mobile';

const {Content} = Layout;

function MainLayout({dispatch, children, location,chat,loading}) {

  //获取loading对象的global,聊天室页面不显示加载
  const isLoading = loading.global && !loading.models.chat;

  /**
   * 订单弹框是否可见标识
   */
  const {orderModalVisible,orderMessages} = chat;

  /**
   * 关闭订单弹框
   */
  function closeOrderDialog() {
    dispatch({
      type:'chat/closeOrderDialog'
    })
  }
  return (
    <Layout>
      <Content className={styles.content}>
        {children}
      </Content>
      <MenuBanner></MenuBanner>
      {/*订单消息全局弹出框*/}
      <Badge count={0} overflowCount={999}>
        <Modal
          title="订单消息"
          visible={orderModalVisible}
          mask={true}
          maskStyle={{backgroundColor: 'rgba(232,230,225,0.5)'}}
          footer={null}
          onOk={() => closeOrderDialog(true)}
          onCancel={() => closeOrderDialog(true)}>
          <OrderMsg orderMessages={orderMessages}/>
        </Modal>
      </Badge>
      {/*全局正在加载组件*/}
      {/*<ActivityIndicator toast text="" animating={isLoading}/>*/}
      <ActivityIndicator toast animating={isLoading}/>

    </Layout>

  );
}
//loading对象为dva-loading组件的对象，处理effects请求的加载状态，全局的
function mapStateToProps({chat,loading}) {
  return {chat,loading};
}
export default connect(mapStateToProps)(MainLayout);
