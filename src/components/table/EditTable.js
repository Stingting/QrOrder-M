import React from 'react';
import {Button, Form, Input, Select} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

const EditTable = ({form:{getFieldDecorator,validateFields},table,saveTable}) => {

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
        values.status = values.status.key;
        //保存餐桌
        console.log(`保存的餐桌信息=${values}`)
        saveTable(values);
      }
    });
  }
  return (
    <div>
      <div style={{textAlign:'center'}}>
        <Form onSubmit={(e)=>handleSubmit(e)} className="login-form">
          <FormItem label="餐桌号：" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue:table.name,
              rules: [{ required: true, message: '请填写餐桌号！' }],
            })(
              <Input disabled={table.id===undefined?false:true}/>
            )}
          </FormItem>
          <FormItem label="容纳人数：" {...formItemLayout}>
            {getFieldDecorator('capacity', {
              initialValue:table.capacity,
              rules: [{ required: true, message: '请填写容纳人数！' }],
            })(
              <Input disabled={table.id===undefined?false:true}/>
            )}
          </FormItem>
          <FormItem label="状态：" {...formItemLayout}>
            {getFieldDecorator('status', {
              initialValue:{key:table.status===undefined?1:table.status}
            })(
              <Select labelInValue  disabled={table.id===undefined?true:false}>
                <Option value={1}>闲置</Option>
                <Option value={2}>点餐中</Option>
                <Option value={3}>正在使用</Option>
                <Option value={4}>待清理</Option>
                <Option value={5}>清理中</Option>
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

export default Form.create()(EditTable);
