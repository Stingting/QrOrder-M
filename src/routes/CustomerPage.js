import React from 'react';
import {connect} from 'dva';
import MainLayout from '../components/common/MainLayout';
import CustomerList from '../components/customer/CustomerList';
import styles from '../assets/less/global.less';
import {NavBar} from 'antd-mobile';

function CustomerPage({ dispatch , fetch, location, customer}) {
  const {customerList, loading} = customer;
  const customerListProps = {customerList, loading};
  return (
    <MainLayout>
      <NavBar
        mode="dark"
        leftContent="用户" className={styles.navbar}>
      </NavBar>
      <CustomerList {...customerListProps}/>
    </MainLayout>
  );
}
CustomerPage.propTypes = {

};
function mapStateToProps({customer}) {
  return {customer};
}
export default connect(mapStateToProps)(CustomerPage);
