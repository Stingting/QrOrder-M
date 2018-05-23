import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Input} from 'antd';
import {NavBar,Button} from 'antd-mobile';

const FormItem = Form.Item;

function Register({ dispatch , fetch, location, register,form:{getFieldDecorator,validateFields}}) {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type:'register/register',
          payload:values
        })
      }
    });
  }

  /**
   *
   * 去登录
   * */
  function toLoginPage() {
    dispatch({
      type:'login/toLoginPage'
    })
  }
  return (
    <div style={{textAlign:'center', margin:'0 auto'}}>
      <NavBar mode="light">二维码点餐商家版</NavBar>
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: '请输入昵称！' }],
          })(
            <Input size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入昵称" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
          )}
        </FormItem>
        <FormItem>
          {/* {getFieldDecorator('remember', {
           valuePropName: 'checked',
           initialValue: true,
         })(
           <Checkbox>记住我</Checkbox>
         )}*/}
          {/*<a className="login-form-forgot" href="">Forgot password</a>*/}
          <div style={{textAlign:'right', padding:10}}><span onClick={toLoginPage}>已有账号，去登录</span></div>

          <Button type="primary" onClick={handleSubmit}>
            注册
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
Register.propTypes = {

};
function mapStateToProps({register}) {
  return {register};
}
export default connect(mapStateToProps)(Form.create()(Register));
