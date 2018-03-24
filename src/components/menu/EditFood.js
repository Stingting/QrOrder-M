import React from 'react';
import {Button, Form} from 'antd';
import {ImagePicker, InputItem, List} from 'antd-mobile';
import EditClassify from './EditClassify';
import EditType from './EditType';

const FormItem = Form.Item;

const EditFood = ({form:{getFieldDecorator,validateFields},
                    food,saveFood,changeFile,uploadFile}) => {

  const formItemLayout ={

  };

  /**
   * 表单验证
   * @param e
   */
  function handleSubmit(e) {
    // e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        //保存食物
        saveFood(values);
      }
    });
  }

  let files = food.pic?[{url:food.pic}]:[];
  function onChange(files, type, index){
    if(type ==='remove') {
      changeFile('',type);
    }
    else {
      //改变文件
      changeFile(files[0].file,type);
      //上传
      uploadFile();
    }
  }
  return (
      <div style={{textAlign:'center',padding:10}}>
        <Form  className="login-form"  layout='vertical'>
          <FormItem {...formItemLayout} label="图片">
            <ImagePicker
              files={files}
              onChange={(files, type, index)=>onChange(files, type, index)}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length ===0}
              multiple={false}
            />
          </FormItem>
          <FormItem label="食物名：" {...formItemLayout}>
            <List>
            {getFieldDecorator('name', {
              initialValue:food.name,
              rules: [{ required: true, message: '请填写食物名称！' }],
            })(
              <InputItem disabled={food.id===undefined?false:true}  placeholder="请输入食物名称"/>
            )}
            </List>
          </FormItem>
          <FormItem label="分类：" {...formItemLayout}>
             <EditClassify/>
          </FormItem>
          <FormItem label="规格：" {...formItemLayout}>
             <EditType/>
          </FormItem>
          <FormItem label="价格：" {...formItemLayout}>
            <List>
            {getFieldDecorator('price', {
              initialValue:food.price===undefined?0:food.price,
              rules: [{ required: true, message: '请填写价格！' }],
            })(
              <InputItem type='number' clear moneyKeyboardAlign="left" extra="¥"  placeholder="请输入食物价格"/>
            )}
            </List>
          </FormItem>
          <FormItem label="描述：" {...formItemLayout}>
            <List>
            {getFieldDecorator('desc', {
              initialValue:food.desc
            })(
              <InputItem  placeholder="请输入食物描述"/>
            )}
            </List>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={handleSubmit} className="login-form-button" style={{width:'100%'}}>
             保存
            </Button>
          </FormItem>
        </Form>
      </div>
  );
}

export default Form.create()(EditFood);
