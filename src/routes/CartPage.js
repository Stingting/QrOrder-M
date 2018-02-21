import React from 'react';
import {connect} from 'dva';
import {Layout, Tabs} from 'antd';
import MainLayout from "../components/common/MainLayout";

const { Header, Content, Footer, Sider} = Layout;
const TabPane = Tabs.TabPane;

function CartPage({ dispatch , fetch, location, cart}) {

  return (
    <MainLayout>

    </MainLayout>
  );
}
CartPage.propTypes = {

};
function mapStateToProps({cart}) {
  return {cart};
}
export default connect(mapStateToProps)(CartPage);
