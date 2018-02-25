import React from 'react';
import {connect} from 'dva';
import styles from './IndexPage.css';
import {getSessionStorage} from "../utils/helper";

function IndexPage({history}) {
  const token = getSessionStorage("token");
  if (token===undefined || token===null || token==='') {
    //跳转到登录页面
    history.push("/app/v1/login");
  } else {
    //跳转到首页
    history.push("/app/v1/mportal");
  }
  return (
    <div className={styles.normal}>
     {/* <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>*/}
      starting merchant app..
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
