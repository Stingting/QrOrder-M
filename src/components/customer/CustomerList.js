import React from 'react';
import {Avatar, List} from 'antd';

const CustomerList = ({loading,customerList}) => {
  return (
      <div style={{paddingTop: 45,backgroundColor:'white'}}>
        <List
          bordered
          split={true}
          loading={loading}
          itemLayout="horizontal"
          dataSource={customerList}
          size="middle"
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.head} size="large"/>}
                title={<p>{item.nickName}</p>}
                description={<span>消费次数：{item.num}</span>}
              />
            </List.Item>
          )}
        />
      </div>
  );
};

CustomerList.propTypes = {
};

export default CustomerList;
