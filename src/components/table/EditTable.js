import React from 'react';
import {Form} from 'antd';
import {Button, InputItem, List, Picker} from 'antd-mobile';
import style from '../../assets/less/global.less';

const FormItem = Form.Item;

const EditTable = ({form:{getFieldDecorator,validateFields},table,saveTable}) => {

  const formItemLayout ={

  };
  const pickerstatus = [
    {
      value: 1,
      label: '闲置',
    },{
      value: 2,
      label: '点餐中',
    },{
      value: 3,
      label: '正在使用',
    },{
      value: 4,
      label: '待清理',
    },{
      value: 5,
      label: '清理中',
    },
  ];
  /**
   * 表单验证
   * @param e
   */
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        //获取key值
        values.status = values.status[0];
        //保存餐桌
        console.log(`保存的餐桌信息=${JSON.stringify(values)}`)
        saveTable(values);
      }
    });
  }
  return (
    <div>
      <div style={{textAlign:'center',fontSize:16}}>
        <Form className="login-form" layout='vertical'>
          <FormItem label="餐桌号" {...formItemLayout}>
            <List>
            {getFieldDecorator('name', {
              initialValue:table.name,
              rules: [{ required: true, message: '请填写餐桌号！' }],
            })(
              <InputItem disabled={table.id===undefined?false:true}/>
            )}
            </List>
          </FormItem>
          <FormItem label="容纳人数" {...formItemLayout}>
            <List>
            {getFieldDecorator('capacity', {
              initialValue:table.capacity,
              rules: [{ required: true, message: '请填写容纳人数！' }],
            })(
              <InputItem type="number" disabled={table.id===undefined?false:true}/>
            )}
            </List>
          </FormItem>
          <FormItem label="状态" {...formItemLayout}>
            <List>
            {getFieldDecorator('status', {
              initialValue:[table.status===undefined?1:table.status],
              rules: [{ required: true}],
            })(
              <Picker data={pickerstatus} cols={1}>
                <List.Item arrow="horizontal"  className={style["picker-list"]}></List.Item>
              </Picker>
            )}
            </List>
          </FormItem>
          <FormItem>
            <Button type="primary"  size='small' onClick={(e)=>handleSubmit(e)}>保存</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}

export default Form.create()(EditTable);
