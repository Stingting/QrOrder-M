import React from 'react';
import styles from './Portal.less';
import {Link} from 'dva/router';

const ShowCount = ({count}) => {
    const eatingPath = {
      pathname:'/app/v1/table',
      state:2
    };
    const emptyPath = {
      pathname:'/app/v1/table',
      state:1
    };
    const saleOutMenuPath = {
      pathname:'/app/v1/menu'
    };
    const tablePath = {
      pathname:'/app/v1/table'
    };
    return (
    <div className={styles["show-count"]}>
      <ul className={styles.count}>
        <li><Link to={eatingPath}>就餐桌数：{count.eatingNum}</Link></li>
        <li>就餐人数：{count.eatingPerson}</li>
      </ul>
      <ul className={styles.count}>
        <li><Link to={emptyPath}>空桌数：{count.emptyTable}</Link></li>
        <li><Link to={saleOutMenuPath}>菜式售馨数：{count.saleOutNum}</Link></li>
      </ul>
      <ul className={styles.count}>
        <li>今日订单金额：{count.price}</li>
        <li><Link to={tablePath}>未读消息数：{count.unReadMsg}</Link></li>
      </ul>
    </div>
  );
};

ShowCount.propTypes = {
};

export default ShowCount;
