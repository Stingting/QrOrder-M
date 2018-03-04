import React from 'react';
import {Button, Form, Input, Select} from 'antd';
import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;

const EditOrder = ({form:{getFieldDecorator,validateFields},orderData,updateOrder}) => {

  const formItemLayout ={
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
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
        values.personNum = values.personNum.key;
        values.tableId = orderData.tableId; //tableId赋值，因表单没有
        //保存
        console.log(`保存的订单信息=${values}`);
        updateOrder(values);
      }
    });
  }
  const maxPersonNum=20;
  const listOptions = () => {
    const res = [];
    for(let i = 1; i <= maxPersonNum; i++) {
      res.push(<Option value={i} key={{key:i}}>{i}人</Option>)
    }
    return res
  };

  return (
    <div>
      <div style={{textAlign:'center'}}>
        <Form onSubmit={(e)=>handleSubmit(e)} className="login-form">
          <FormItem label="订单号：" {...formItemLayout}>
            {getFieldDecorator('id', {
              initialValue:orderData.id
            })(
              <span>{orderData.id}</span>
            )}
          </FormItem>
          <FormItem label="下单时间：" {...formItemLayout}>
            {getFieldDecorator('createTime', {
              initialValue:orderData.createTime
            })(
              <span>{moment(orderData.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            )}
          </FormItem>
          <FormItem label="订单状态：" {...formItemLayout}>
            {getFieldDecorator('status', {
              initialValue:orderData.status
            })(
              <span>
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

          <FormItem label="餐桌号：" {...formItemLayout}>
            {getFieldDecorator('tableName', {
              initialValue:orderData.tableName
            })(
              <span>{orderData.tableName}</span>
            )}
          </FormItem>
          <FormItem label="用餐人数：" {...formItemLayout}>
            {getFieldDecorator('personNum', {
              initialValue:{key:orderData.personNum}
            })(
              <Select labelInValue>
                {listOptions()}
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
              保存
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}

export default Form.create()(EditOrder);
