import React from 'react';
import {connect} from 'dva';
import MainLayout from '../components/common/MainLayout';
import {Layout} from 'antd';

const { Header, Content, Footer, Sider} = Layout;

function MenuPage({ dispatch , fetch, location, menu}) {

 return (
    <MainLayout>
    
    </MainLayout>
  );
}
MenuPage.propTypes = {

};
function mapStateToProps({ menu}) { //只接管menu model的state值
  return {menu};
}
export default connect(mapStateToProps)(MenuPage);
