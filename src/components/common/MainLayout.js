import React from 'react';
import MenuBanner from './MenuBanner';
import {Layout,Modal,Badge} from 'antd';
import styles from '../../assets/less/global.less';
import {connect} from "dva";
import OrderMsg from '../order/OrderMsg';

const { Header, Content, Footer, Sider} = Layout;

function MainLayout({dispatch, children, location,chat}) {

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
    </Layout>
  );
}

function mapStateToProps({chat}) {
  return {chat};
}
export default connect(mapStateToProps)(MainLayout);
