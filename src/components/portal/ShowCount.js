import React from 'react';
import styles from './Portal.less';
import {Link} from 'dva/router';
import {getLocalStorage, isObject} from "../../utils/helper";

const ShowCount = ({count}) => {
    const eatingPath = {
      pathname:'/app/v1/table',
      state:3
    };
    const emptyPath = {
      pathname:'/app/v1/table',
      state:1
    };
    const saleOutMenuPath = {
      pathname:'/app/v1/menu',
      state:0
    };
    const tablePath = {
      pathname:'/app/v1/table'
    };
    return (
    <div className={styles["show-count"]}>
      <div className={styles.left}>
        <div className={styles["num-left"]}>
          <p>就餐桌数</p>
          <div className={styles['circle-eating']}>
              <Link to={eatingPath}>
                {/*<p><Icon type="user" style={{fontSize:30}} /></p>*/}
                <p>{count.eatingNum}</p>
              </Link>
          </div>
        </div>
        <div className={styles["num-left"]}>
          <p>就餐人数</p>
          <div className={styles['circle-eating']}>
              {/*<p><Icon type="user" style={{fontSize:30}} /></p>*/}
              <p>{count.eatingPerson}</p>
          </div>
        </div>
      </div>

      <div className={styles.left}>
        <div className={styles["num-middle"]}>
          <p>空桌数</p>
          <div className={styles['circle-eating']}>
            <Link to={emptyPath}>
              {/*<p><Icon type="user" style={{fontSize:30}} /></p>*/}
              <p>{count.emptyTable}</p>
            </Link>
          </div>
        </div>
        <div className={styles["num-middle"]}>
          <p>菜式售罄数</p>
          <div className={styles['circle-eating']}>
            <Link to={saleOutMenuPath}>
              {/*<p><Icon type="user" style={{fontSize:30}} /></p>*/}
              <p>{count.saleOutNum}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.left}>
        <div className={styles["num-right"]}>
          <p>今日订单金额</p>
          <div className={styles['circle-eating']}>
              {/*<p><Icon type="pay-circle-o" style={{fontSize:30}} /></p>*/}
              <p>&yen;{count.price}</p>
          </div>
        </div>
        <div className={styles["num-right"]}>
          <p>未读消息数</p>
          <div className={styles['circle-eating']}>
            <Link to={tablePath}>
              {/*<p><Icon type="message" style={{fontSize:30}} /></p>*/}
              <p>{isObject(getLocalStorage("tableTotalUnreadCount"))?getLocalStorage("tableTotalUnreadCount"):0}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ShowCount.propTypes = {
};

export default ShowCount;
