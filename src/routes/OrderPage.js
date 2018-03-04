import React from 'react';
import {connect} from 'dva';
import {Layout, Tabs} from 'antd';
import MainLayout from "../components/common/MainLayout";
import OrderList from "../components/order/OrderList";
import styles from '../assets/less/global.less';

const { Header, Content, Footer, Sider} = Layout;
const TabPane = Tabs.TabPane;

function CartPage({ dispatch , fetch, location, order}) {

  const {orderList, loading,totalPerson,totalPrice,totalCount,orderData,visible} = order;
  const orderListProps = {orderList, loading,totalPerson,totalPrice,totalCount,orderData,visible};

  /**
   * 跳转修改订单页面
   * @param orderData
   */
  function toUpdateOrder(orderData) {
    dispatch({
      type:'order/toUpdateOrder',
      orderData:orderData
    })
  }

  /**
   * 修改订单
   * @param data
   */
  function updateOrder(data) {
    dispatch({
      type:'order/updateOrder',
      orderData:data
    })
  }

  //关闭订单编辑框
  function closeDialog() {
    dispatch({
      type : 'order/closeDialog'
    })
  }

  /**
   * 修改订单状态
   * @param orderId
   * @param status
   */
  function updateOrderStatus(orderId, status) {
    dispatch({
      type : 'order/updateOrderStatus',
      orderId:orderId,
      status:status
    })
  }
  return (
    <MainLayout>
       <div className={styles["top-banner"]}>订单</div>
       <OrderList {...orderListProps}
                  closeDialog={closeDialog}
                  toUpdateOrder={toUpdateOrder}
                  updateOrder={updateOrder}
                  updateOrderStatus={updateOrderStatus}
       />
    </MainLayout>
  );
}
CartPage.propTypes = {

};
function mapStateToProps({order}) {
  return {order};
}
export default connect(mapStateToProps)(CartPage);
