import React from 'react';
import {Avatar, List,Button,Modal} from 'antd';
import {updateOrder} from "../../services/merchant";
import EditOrder from './EditOrder';
import moment from 'moment';
import styles from './OrderList.less';

const OrderList = ({loading,orderList,totalPerson,totalPrice,totalCount,orderData,visible,
                     toUpdateOrder,updateOrder,updateOrderStatus,closeDialog}) => {

  const action = (status,orderId,data) =>{
    const sureStatus  = 3;
    const finishStatus = 4;
    switch (status) {
      case 0: return '';
      case 1: return  <Button type="primary" onClick={() => toUpdateOrder(data)}>修改</Button> ;
      case 2: return  <Button type="danger" onClick={() => updateOrderStatus(orderId,sureStatus)}>确认收款</Button> ;
      case 3: return  <Button type="danger" onClick={() => updateOrderStatus(orderId,finishStatus)}>确认完成</Button> ;
      case 4: return '';
    }
  };
  return (
    <div className={styles['order-list']}>
      <div className={styles.head}>
        总金额:&yen;{totalPrice} 总单数:{totalCount} 服务人数：{totalPerson}
      </div>
      <div className={styles.content}>
        <List
          bordered
          split={true}
          loading={loading}
          itemLayout="horizontal"
          dataSource={orderList}
          size="middle"
          renderItem={item => (
            <List.Item actions={[action(item.status,item.id,item)]}>
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

      <Modal
        style={{margin: 0, top: 0,height:"100%"}}
        width="100%"
        title="修改订单"
        visible={visible}
        mask={true}
        maskStyle={{backgroundColor: 'rgba(232,230,225,0.5)'}}
        footer={null}
        onOk={() => closeDialog(true)}
        onCancel={() => closeDialog(true)}>
        <EditOrder updateOrder={updateOrder} orderData={orderData}/>
      </Modal>

    </div>
  );
};

OrderList.propTypes = {
};

export default OrderList;
