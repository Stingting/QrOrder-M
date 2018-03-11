import React from 'react';
import {Icon, Menu,Badge} from 'antd';
import {Link} from 'dva/router';
import {connect} from 'dva';
import styles from '../../assets/less/global.less';

function MenuBanner ({dispatch, navigation}) {
  function handleClick (e) {
    dispatch({
      type:'navigation/setCurrentKey',
      current: e.key,
    });
  };

  return (
    <Menu
      style={{textAlign:'center',position:'fixed',bottom:0,width:'100%',borderTop:'1px solid #ccc'}}
      mode="horizontal"
      onClick={handleClick}
      selectedKeys={[navigation.current]}>
      <Menu.Item key="portal" style={{width:'20%'}}> <Icon type="home"  className={styles.menu}/><div className={styles["menu-text"]}>首页</div>
        <Link to="/app/v1/mportal"></Link>
      </Menu.Item>
      <Menu.Item key="menu" style={{width:'20%'}}> <Icon type="appstore-o"  className={styles.menu}/><div className={styles["menu-text"]}>菜品</div>
        <Link to="/app/v1/menu"></Link>
      </Menu.Item>
      <Menu.Item key="order" style={{width:'20%'}}>
        <Icon type="profile" className={styles.menu}/>
        <div className={styles["menu-text"]}>订单</div>
        <Link to="/app/v1/order"></Link>
      </Menu.Item>
      <Menu.Item key="customer" style={{width:'20%'}}> <Icon type="user"  className={styles.menu}/><div className={styles["menu-text"]}>用户</div>
        <Link to="/app/v1/customer"></Link>
      </Menu.Item>
      <Menu.Item key="setting" style={{width:'20%'}}> <Icon type="setting"  className={styles.menu}/><div className={styles["menu-text"]}>设置</div>
        <Link to="/app/v1/setting"></Link>
      </Menu.Item>
    </Menu>
  );
};

MenuBanner.propTypes = {
};

function mapStateToProps({navigation}) {
  return {navigation};
}

export default connect(mapStateToProps)(MenuBanner);
