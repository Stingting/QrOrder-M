import React from 'react';
import {Table,Divider,Icon} from 'antd';
import styles from './Portal.less';

const TodayOrder = ({orderList}) => {
  const columns = [{
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  }, {
    title: '桌号',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '容量',
    dataIndex: 'capacity',
    key: 'capacity',
  }, {
    title: '人数',
    dataIndex: 'personNum',
    key: 'personNum',
  }, {
    title: '总价',
    dataIndex: 'price',
    key: 'price',
  },{
    title:'就餐状态',
    dataIndex:'status',
    render:(text, record) => (
      <span>{text==='1'?'未付款':'已付款'}</span>
    )
  }];
  return (
    <div className={styles["today-order"]}>
      <Table dataSource={orderList} columns={columns} pagination={false} scroll={{ x: true, y: 300 }}/>
    </div>
  );
};

TodayOrder.propTypes = {
};

export default TodayOrder;
