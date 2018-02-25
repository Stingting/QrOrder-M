import React from 'react';
import {connect} from 'dva';
import {Layout, Tabs} from 'antd';
import MainLayout from "../components/common/MainLayout";
import OrderList from "../components/order/OrderList";
import styles from '../assets/less/global.less';

const { Header, Content, Footer, Sider} = Layout;
const TabPane = Tabs.TabPane;

function CartPage({ dispatch , fetch, location, order}) {

  const {orderList, loading,totalPerson,totalPrice,totalCount} = order;
  const orderListProps = {orderList, loading,totalPerson,totalPrice,totalCount};

  return (
    <MainLayout>
       <div className={styles["top-banner"]}>订单</div>
       <OrderList {...orderListProps}/>
    </MainLayout>
  );
}
CartPage.propTypes = {

};
function mapStateToProps({order}) {
  return {order};
}
export default connect(mapStateToProps)(CartPage);
