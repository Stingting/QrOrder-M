import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Input} from 'antd';
import {NavBar,Button} from 'antd-mobile';

const FormItem = Form.Item;

function Login({ dispatch , fetch, location, login,form:{getFieldDecorator,validateFields}}) {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type:'login/login',
          payload:values
        })
      }
    });
  }

  /**
   * 去注册
   * */
  function toRegister() {
    dispatch({
      type:'login/toRegisterPage',
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
         {getFieldDecorator('password', {
           rules: [{ required: true, message: '请输入密码！' }],
         })(
           <Input size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
         )}
       </FormItem>

       <div style={{textAlign:'right', padding:10}}><span onClick={toRegister}>没有账号？点击注册账号</span></div>

       <FormItem>
        {/* {getFieldDecorator('remember', {
           valuePropName: 'checked',
           initialValue: true,
         })(
           <Checkbox>记住我</Checkbox>
         )}*/}
         {/*<a className="login-form-forgot" href="">Forgot password</a>*/}
         <Button type="primary" onClick={handleSubmit}>
           登录
         </Button>
       </FormItem>
     </Form>
   </div>
  );
}
Login.propTypes = {

};
function mapStateToProps({login}) {
  return {login};
}
export default connect(mapStateToProps)(Form.create()(Login));
