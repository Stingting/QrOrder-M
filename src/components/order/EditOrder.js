import React from 'react';
import {Button, Form} from 'antd';
import {List, Picker} from 'antd-mobile';
import moment from 'moment';

const FormItem = Form.Item;

const EditOrder = ({form:{getFieldDecorator,validateFields},orderData,updateOrder}) => {

  const formItemLayout ={
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };

  /**
   * 表单验证
   * @param e
   */
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        //获取key值
        values.id = orderData.id;
        values.personNum = values.personNum[0];
        values.tableId = orderData.tableId; //tableId赋值，因表单没有
        //保存
        console.log(`保存的订单信息=${JSON.stringify(values)}`);
        updateOrder(values);
      }
    });
  }
  const maxPersonNum=20;
  const listOptions = () => {
    const res = [];
    for(let i = 1; i <= maxPersonNum; i++) {
      res.push({
        value: i,
        label: `${i}人`,
      })
    }
    return res
  };

  return (
      <div style={{textAlign:'center', padding:10}}>
        <Form onSubmit={(e)=>handleSubmit(e)} className="login-form" layout='vertical'>
          <FormItem label="订单号" {...formItemLayout}>
            {getFieldDecorator('orderNo', {
              initialValue:orderData.orderNo
            })(
              <span style={{float:'left',color: '#bbb'}}>{orderData.orderNo}</span>
            )}
          </FormItem>
          <FormItem label="下单时间" {...formItemLayout}>
            {getFieldDecorator('createTime', {
              initialValue:orderData.createTime
            })(
              <span style={{float:'left',color: '#bbb'}}>{moment(orderData.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            )}
          </FormItem>
          <FormItem label="订单状态" {...formItemLayout}>
            {getFieldDecorator('status', {
              initialValue:orderData.status
            })(
              <span style={{float:'left',color: '#bbb'}}>
                {(() => {
                  switch (orderData.status) {
                    case 0:  return "未知";
                    case 1:  return "待付款";
                    case 2:  return "已付款";
                    case 3:  return "已确认";
                    case 4:  return "已完成";
                    default: return "";
                  }
                })()}
              </span>
            )}
          </FormItem>

          <FormItem label="餐桌号" {...formItemLayout}>
            {getFieldDecorator('tableName', {
              initialValue:orderData.tableName
            })(
              <span style={{float:'left',color: '#bbb'}}>{orderData.tableName}</span>
            )}
          </FormItem>
          <FormItem label="用餐人数" {...formItemLayout}>
            {getFieldDecorator('personNum', {
              initialValue:[orderData.personNum]
            })(
              <Picker data={listOptions()} cols={1}>
                <List.Item arrow="horizontal"></List.Item>
              </Picker>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
              保存
            </Button>
          </FormItem>
        </Form>
      </div>
  );
}

export default Form.create()(EditOrder);
