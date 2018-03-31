import React from 'react';
import {Menu} from 'antd';
import {Link} from 'dva/router';
import {connect} from 'dva';
import styles from '../../assets/less/global.less';
import homesvg from '../../assets/svg/home.svg';
import menusvg from '../../assets/svg/menu.svg';
import ordersvg from '../../assets/svg/order.svg';
import settingsvg from '../../assets/svg/setting.svg';
import usersvg from '../../assets/svg/user.svg';
import useractivesvg from '../../assets/svg/user-active.svg';
import settingactivesvg from '../../assets/svg/setting-active.svg';
import homeactivesvg from '../../assets/svg/home-active.svg';
import menuactivesvg from '../../assets/svg/menu-active.svg';
import orderactivesvg from '../../assets/svg/order-active.svg';
import SVG from 'react-inlinesvg';

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
      <Menu.Item key="portal" style={{width:'20%'}}>
        {navigation.current ==='portal'?<SVG src={homeactivesvg}></SVG>:<SVG src={homesvg}></SVG>}
        <div className={styles[navigation.current ==='portal'?"menu-text-active":"menu-text"]}>首页</div>
        <Link to="/app/v1/mportal"></Link>
      </Menu.Item>
      <Menu.Item key="menu" style={{width:'20%'}}>
        {navigation.current ==='menu'?<SVG src={menuactivesvg}></SVG>:<SVG src={menusvg}></SVG>}
        <div className={styles[navigation.current ==='menu'?"menu-text-active":"menu-text"]}>菜谱</div>
        <Link to="/app/v1/menu"></Link>
      </Menu.Item>
      <Menu.Item key="order" style={{width:'20%'}}>
        {navigation.current ==='order'?<SVG src={orderactivesvg}></SVG>:<SVG src={ordersvg}></SVG>}
        <div className={styles[navigation.current ==='order'?"menu-text-active":"menu-text"]}>订单</div>
        <Link to="/app/v1/order"></Link>
      </Menu.Item>
      <Menu.Item key="customer" style={{width:'20%'}}>
        {navigation.current ==='customer'?<SVG src={useractivesvg}></SVG>:<SVG src={usersvg}></SVG>}
        <div className={styles[navigation.current ==='customer'?"menu-text-active":"menu-text"]}>用户</div>
        <Link to="/app/v1/customer"></Link>
      </Menu.Item>
      <Menu.Item key="setting" style={{width:'20%'}}>
        {navigation.current ==='setting'?<SVG src={settingactivesvg}></SVG>:<SVG src={settingsvg}></SVG>}
        <div className={styles[navigation.current ==='setting'?"menu-text-active":"menu-text"]}>设置</div>
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
