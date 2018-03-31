import React from 'react';
import {Button, List} from 'antd';
import {connect} from 'dva';
import styles from './OrderList.less';
import {Icon, Modal, NavBar, Popover,WingBlank} from 'antd-mobile';
import moment from 'moment';
import EditOrder from './EditOrder';

const Item = Popover.Item;

function OrderDetail ({dispatch,location,order}) {

  const {detail,visible} = order;

  /**
   * 跳转修改订单页面
   * @param orderData
   */
  function toUpdateOrder(orderData) {
    dispatch({
      type:'order/toUpdateOrder',
      orderData:orderData
    })
  }

  /**
   * 修改订单
   * @param data
   */
  function updateOrder(data) {
    dispatch({
      type:'order/updateOrder',
      orderData:data
    })
  }

  //关闭订单编辑框
  function closeDialog() {
    dispatch({
      type : 'order/closeDialog'
    })
  }

  /**
   * 修改订单状态
   * @param orderId
   * @param status
   */
  function updateOrderStatus(orderId, status) {
    dispatch({
      type : 'order/updateOrderStatus',
      orderId:orderId,
      status:status
    })
  }

  const detailData = order.detail;
  const action = () =>{
    const sureStatus  = 3;
    const finishStatus = 4;
    let action;
    switch (detailData.status) {
      case 0: action =''; break;
      case 1: action = <Button type="primary" onClick={() => toUpdateOrder(detailData)}>修改</Button> ;break;
      case 2: action = <Button type="danger" onClick={() => updateOrderStatus(detailData.id,sureStatus)}>确认收款</Button> ;break;
      case 3: action = <Button type="danger" onClick={() => updateOrderStatus(detailData.id,finishStatus)}>确认完成</Button> ;break;
      case 4: action ='';break;
      default : action='';break;
    }
    return action;
  };
  const orderDetailContent =
    <div className={styles["detail-content"]}>
      <div className={styles.tip}>
        {/*0:未知,1:待付款,2:已付款,3:已确认,4:已完成*/}
        {(() => {
          switch (detailData.status) {
            case 0:   return "未知";
            case 1: return "待付款";
            case 2:  return "已付款";
            case 3:  return "已确认";
            case 4:  return "已完成";
            default: return "";
          }
        })()}
      </div>
      <div className={styles.content}>
        <WingBlank>
          <List
            itemLayout="horizontal"
            dataSource={detailData.list}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
                  title={<span className={styles.dishname}>{item.name}</span>}
                  description={<div>
                    <div>{item.desc}</div>
                    <div>{item.type.name}&nbsp;月售:&nbsp;{item.saleCount}</div>
                    <div><span style={{color: 'red'}}>&yen;{item.price}</span>
                    </div>
                  </div>}
                />
                <div>
                  &times;{item.num}
                </div>
              </List.Item>
            )}
          />
        </WingBlank>
      </div>
      <div className={styles.bottom}>
        <span>合计：&yen;{detailData.price} &nbsp;&nbsp;</span>
      </div>
      <div className={styles["order-desc"]}>
        <div><span className={styles.title}>餐桌</span>&nbsp;{detailData.tableName}</div>
        <div><span className={styles.title}>用餐人数</span>&nbsp;{detailData.personNum}人</div>
        <div><span className={styles.title}>订单号码</span>&nbsp;{detailData.orderNo}</div>
        <div><span className={styles.title}>订单时间</span>&nbsp;{moment(detailData.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
      <div className={styles.action}>{action()}</div>
    </div>

  /**
   * 返回订单列表
   */
  function backOrderList() {
    dispatch({
      type:'order/backOrderList'
    })
  };

  /**
   * 返回首页
   */
  function onSelect(opt) {
      dispatch({
        type:'portal/backToPortal'
      })
  }

  return (
    <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => backOrderList()}
          rightContent={
            <Popover mask
                     overlayClassName="fortest"
                     overlayStyle={{color: 'currentColor'}}
                     overlay={[
                       (<Item key="1" value="home" data-seed="logId">首页</Item>)
                     ]}
                     align={{
                       overflow: {adjustY: 0, adjustX: 0},
                       offset: [-10, 0],
                     }}
                     onSelect={onSelect}>
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}>
              <Icon type="ellipsis"/>
              </div>
            </Popover>
          }
        >订单详情</NavBar>
      <div>
        {orderDetailContent}
      </div>
      <Modal
        title="修改订单"
        visible={visible}
        footer={[]}
        closable={true}
        onClose={() => closeDialog(true)}>
        <EditOrder updateOrder={updateOrder} orderData={detail}/>
      </Modal>
    </div>
  );
};

function mapStateToProps({order}) {
  return {order};
}
export default connect(mapStateToProps)(OrderDetail);
