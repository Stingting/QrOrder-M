import React from 'react';
import {Button, Form, Icon, Input, message, Popconfirm, Select, Upload,InputNumber} from 'antd';
import EditClassify from './EditClassify';

const Option = Select.Option;
const FormItem = Form.Item;

const EditFood = ({form:{getFieldDecorator,validateFields},
                    food,saveFood,file,uploadLoading,changeFile,uploadFile,deleteFood}) => {

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
        //保存食物
        saveFood(values);
      }
    });
  }

  function beforeUpload(file) {
    let reg = new RegExp(/^image\/\jpeg|gif|jpg|png|bmp$/, 'i');
    if (reg.test(file.type)) {
      if (file.size/1024 <= 200) {
        return true;
      } else {
        message.info('上传文件过大');
        return false;
      }
    } else {
      message.info('图片格式不对');
      return false;
    }
    return false; //终止组件上传，手动上传，antd组件上传有问题，所以手动上传
  }

  function handleChange(info){
    changeFile(info.file.originFileObj); //获取文件File对象
  }

  const uploadProps = {
    accept: "image/jpg,image/jpeg,image/png,image/bmp,image/gif",
    showUploadList:false,
    beforeUpload:(file)=>beforeUpload(file),
    onChange:(info)=>handleChange(info)
  };

  return (
    <div>
      <div style={{textAlign:'center'}}>
        <Form onSubmit={(e)=>handleSubmit(e)} className="login-form">
          <FormItem label="食物名：" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue:food.name
            })(
              <Input disabled={food.id===undefined?false:true}/>
            )}
          </FormItem>
          <FormItem label="分类：" {...formItemLayout}>
             <EditClassify/>
          </FormItem>
          <FormItem label="规格：" {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue:food.type
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="价格：(元)" {...formItemLayout}>
            {getFieldDecorator('price', {
              initialValue:food.price==undefined?0:food.price
            })(
              <InputNumber min={0} max={100000}/>
            )}
          </FormItem>
          <FormItem label="描述：" {...formItemLayout}>
            {getFieldDecorator('desc', {
              initialValue:food.desc
            })(
              <Input.TextArea/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="图片">
            {food.pic ? <img src={food.pic} alt="" /> :""}
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> 选择图片
              </Button>
            </Upload>
            <Button
              className="upload-demo-start"
              type="primary"
              onClick={uploadFile}
              disabled={file===undefined||file===''}
              loading={uploadLoading}
            >
              上传
            </Button>
            {file?file.fileName:""}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
             保存
            </Button>
          </FormItem>
        </Form>
      </div>
      <div style={{width:'100%', display:food.id===undefined?'none':'inline'}} >
        <Popconfirm placement="top" title="确定要删除吗" onConfirm={() => deleteFood(food.id)} okText="确定" cancelText="取消">
          <Button type="danger" style={{width:'100%'}}>删除</Button>
        </Popconfirm>
      </div>
    </div>
  );
}

export default Form.create()(EditFood);
