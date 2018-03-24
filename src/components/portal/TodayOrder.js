import React from 'react';
import {Icon, Table} from 'antd';
import styles from './Portal.less';
import moment from 'moment';

const TodayOrder = ({orderList}) => {
  const columns = [{
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    render:(text, record)=>(
      <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
    )
  }, {
    title: '桌号',
    dataIndex: 'name',
    key: 'name'

  },/* {
    title: '容量',
    dataIndex: 'capacity',
    key: 'capacity',
  }, {
    title: '人数',
    dataIndex: 'personNum',
    key: 'personNum',
  },*/ {
    title: '总价',
    dataIndex: 'price',
    key: 'price',
    render:(text,record) => (
      <span>&yen;{text}</span>
    )
  },{
    title:'就餐状态',
    dataIndex:'status',
    key:'status',
    render:(text, record) => (
      <div key={record.id}>
        <span>{text===1?<Icon type="close-circle" style={{color:'red'}}/>:<Icon type="check-circle" style={{color:'green'}}/>}</span>
        <span>{text===1?'未付款':'已付款'}</span>
      </div>
    )
  }];
  return (
    <div className={styles["today-order"]}>
      <div style={{height:'30px', lineHeight:'30px',fontWeight:'bold',textAlign:'left',borderBottom:'1px solid #ccc'}}>今日订单</div>
      <div>
        <Table rowKey="id" dataSource={orderList} columns={columns} pagination={false} scroll={{ x: true, y: 300 }} showHeader={false}/>
      </div>
    </div>
  );
};

TodayOrder.propTypes = {
};

export default TodayOrder;
