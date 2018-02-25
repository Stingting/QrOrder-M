import React from 'react';
import {Form, Icon, Input,Button,Select,InputNumber,Upload,message,Avatar,Popconfirm} from 'antd';
import styles from './EditFood.less';

const Option = Select.Option;
const FormItem = Form.Item;

const EditFood = ({form:{getFieldDecorator,validateFields},food,saveFood,file,changeFile,uploadFile,deleteFood}) => {

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

  const uploadButton = (
    <div>
      {/*<Icon type={this.state.loading ? 'loading' : 'plus'} />*/}
      <Icon type={'plus'}  style={{ fontSize: 46}} />
      <div className="ant-upload-text">上传</div>
    </div>
  );

  function beforeUpload(file) {
    changeFile(file);
    return false;
  }


  return (
    <div>
      <div style={{textAlign:'center'}}>
        <Form onSubmit={(e)=>handleSubmit(e)} className="login-form">
          <FormItem label="菜名：" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue:food.name
            })(
              <Input disabled={food.id===undefined?false:true}/>
            )}
          </FormItem>
          <FormItem label="分类：" {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue:food.type
            })(
              <Select>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="价格：" {...formItemLayout}>
            {getFieldDecorator('price', {
              initialValue:food.price
            })(
              <Input/>
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
            {getFieldDecorator('pic', {
              initialValue:food.pic
            })(
              <Upload
                accept="image/*"
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/v1/upload"
                beforeUpload={(file)=>beforeUpload(file)}
              >
                {food.pic ? <Avatar src={food.pic} alt="" /> : uploadButton}
              </Upload>
            )}
            <Button onClick={uploadFile}/>
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
