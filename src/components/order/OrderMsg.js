import React from 'react';
import {List} from 'antd';
import moment from 'moment';

const OrderMsg = (orderMessages) => {
  return (
    <div>
      <List
        bordered
        split={true}
        itemLayout="horizontal"
        dataSource={orderMessages}
        size="middle"
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<div style={{fontSize:12, fontWeight:'bold'}}>桌号：{item.tableName}&nbsp;人数：{item.personNum}人</div>}
              description={
                <div style={{fontSize:10}}>
                  <div>下单时间：{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                  <div>总价：&yen;{item.price}</div>
                </div>
              }
            />
            <div style={{color:'#00ffcc'}}>
              {/*0:未知,1:待付款,2:已付款,3:已确认,4:已完成*/}
              {(() => {
                switch (item.status) {
                  case 0:   return "未知";
                  case 1: return "待付款";
                  case 2:  return "已付款";
                  case 3:  return "已确认";
                  case 4:  return "已完成";
                  default: return "";
                }
              })()}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

OrderMsg.propTypes = {
};

export default OrderMsg;
