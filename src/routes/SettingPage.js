import React from 'react';
import {connect} from 'dva';
import MainLayout from '../components/common/MainLayout';
import styles from '../assets/less/global.less';
import {NavBar} from 'antd-mobile';

function SettingPage({ dispatch , fetch, location, setting}) {
  return (
    <MainLayout>
      <NavBar
        mode="dark"
        leftContent="设置" className={styles.navbar}>
      </NavBar>
    </MainLayout>
  );
}
SettingPage.propTypes = {

};
function mapStateToProps({setting}) {
  return {setting};
}
export default connect(mapStateToProps)(SettingPage);
