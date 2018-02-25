import React from 'react';
import {connect} from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
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
  return (
   <div style={{textAlign:'center', paddingTop:'50px'}}>
     <Form onSubmit={(e)=>handleSubmit(e)} className="login-form">
       <FormItem>
         {getFieldDecorator('userName', {
           rules: [{ required: true, message: '请输入用户名！' }],
         })(
           <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
         )}
       </FormItem>
       <FormItem>
         {getFieldDecorator('password', {
           rules: [{ required: true, message: '请输入密码！' }],
         })(
           <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
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
         <Button type="primary" htmlType="submit" className="login-form-button">
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
