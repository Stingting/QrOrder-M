import React from 'react';
import {Button, Form} from 'antd';
import {ImagePicker, InputItem, List} from 'antd-mobile';
import EditClassify from './EditClassify';
import EditType from './EditType';
import {compress} from '../../utils/ImageCompressUtil';

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
    else if(type==='add') {
      //图片压缩
      compress(files[0].file, 0.5, function (err, data) {
        if (err) {
          console.log(err.message);
          return;
        }
        console.log(data);
        //改变文件
        changeFile(data,type);
        //上传
        uploadFile();
      });

    } else {
      console.log(type);
    }
  }
  return (
      <div style={{textAlign:'center',paddingBottom:10}}>
        <Form  className="login-form"  layout='vertical'>
          <FormItem {...formItemLayout} label="食物图片">
            <ImagePicker
              files={files}
              onChange={(files, type, index)=>onChange(files, type, index)}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length ===0}
              multiple={false}
            />
          </FormItem>
          <FormItem label="食物名称" {...formItemLayout}>
            <List>
            {getFieldDecorator('name', {
              initialValue:food.name,
              rules: [{ required: true, message: '请输入食物名称！' }],
            })(
              <InputItem  placeholder="请输入食物名称"/>
            )}
            </List>
          </FormItem>
          <FormItem label="食物分类" {...formItemLayout}>
             <EditClassify/>
          </FormItem>
          <FormItem label="食物规格" {...formItemLayout}>
             <EditType/>
          </FormItem>
          <FormItem label="食物价格" {...formItemLayout}>
            <List>
            {getFieldDecorator('price', {
              initialValue:food.price===undefined?0:food.price,
              rules: [{ required: true, message: '请填写价格！' }],
            })(
              <InputItem type='money' clear moneyKeyboardAlign="left" extra="¥"  placeholder="请输入食物价格"/>
            )}
            </List>
          </FormItem>
          <FormItem label="食物描述" {...formItemLayout}>
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
