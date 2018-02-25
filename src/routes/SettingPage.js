import React from 'react';
import {connect} from 'dva';
import MainLayout from '../components/common/MainLayout';
import styles from '../assets/less/global.less';

function SettingPage({ dispatch , fetch, location, setting}) {
  return (
    <MainLayout>
      <div className={styles["top-banner"]}>设置</div>
    </MainLayout>
  );
}
SettingPage.propTypes = {

};
function mapStateToProps({setting}) {
  return {setting};
}
export default connect(mapStateToProps)(SettingPage);
