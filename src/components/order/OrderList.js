import React from 'react';
import {Button, List} from 'antd';
import EditOrder from './EditOrder';
import moment from 'moment';
import styles from './OrderList.less';
import {Modal} from 'antd-mobile';

const OrderList = ({loading,orderList,totalPerson,totalPrice,totalCount,orderData,visible,
                     toUpdateOrder,updateOrder,updateOrderStatus,closeDialog,toOrderDetail}) => {

  const action = (status,orderId,data) =>{
    const sureStatus  = 3;
    const finishStatus = 4;
    let action;
    switch (status) {
      case 0: action =''; break;
      case 1: action = <Button type="primary" onClick={(e) =>{e.stopPropagation();toUpdateOrder(data)}}>修改</Button> ;break;
      case 2: action = <Button type="danger" onClick={(e) => {e.stopPropagation();updateOrderStatus(orderId,sureStatus)}}>确认收款</Button> ;break;
      case 3: action = <Button type="danger" onClick={(e) => {e.stopPropagation();updateOrderStatus(orderId,finishStatus)}}>确认完成</Button> ;break;
      case 4: action ='';break;
      default : action='';break;
    }
    return action;
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
            <List.Item actions={[action(item.status,item.id,item)]} onClick={() => toOrderDetail(item.id)}>
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
        title="修改订单"
        visible={visible}
        footer={[]}
        closable={true}
        onClose={() => closeDialog(true)}>
        <EditOrder updateOrder={updateOrder} orderData={orderData}/>
      </Modal>

    </div>
  );
};

OrderList.propTypes = {
};

export default OrderList;
