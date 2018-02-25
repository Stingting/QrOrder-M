import React from 'react';
import {connect} from 'dva';
import MainLayout from '../components/common/MainLayout';
import ShowCount from '../components/portal/ShowCount';
import TodayOrder from '../components/portal/TodayOrder';
import {Layout} from 'antd';

const { Header, Content, Footer, Sider} = Layout;

function MerchantPortal({ dispatch , fetch, location, portal}) {

  const { orderList,eatingNum,eatingPerson,emptyTable,price,saleOutNum,unReadMsg} = portal;
  const countProps = {eatingNum, eatingPerson,emptyTable,price,saleOutNum,unReadMsg};

  return (
    <MainLayout>
      <ShowCount count={countProps}/>
      <TodayOrder orderList={orderList}/>
    </MainLayout>
  );
}
MerchantPortal.propTypes = {


};
function mapStateToProps({ portal}) {
  return {portal};
}
export default connect(mapStateToProps)(MerchantPortal);
