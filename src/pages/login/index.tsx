import './index.less';
import { Form, Input, Button } from 'antd';
import Logo from '@/assets/logo.png';
import { connect, ConnectRC, history } from 'umi';
import { SwapRightOutlined } from '@ant-design/icons';
import ImgSelector from './ImgSelector';
import { IUserInfo } from '@/typing';

const layout = {
  wrapperCol: { span: 24 },
};

const Login: ConnectRC = ({dispatch}) => {
  const onFinish = (values: IUserInfo) => {
    dispatch({ type: 'global/saveUserInfo', payload: values });
    // history.push("/manage")
  };
  const onFinishFailed = (errorInfo: any)=>{
    console.log(`login failed`, errorInfo);
  }
    
  return (
    <div className="login-wrap">
      <header className="login-header">
        <div className="logo-wrap">
          <img src={Logo} alt="Life Manage | 你的专属生活管家" />
        </div>
      </header>
      <main className="login-main">
        <Form
          {...layout}
          name="login"
          className="form-wrap"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="nickname"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="请输入用户名(字母,数字,下划线)" />
          </Form.Item>
          <Form.Item
            name="tx"
            label="选择头像"
            rules={[{ required: true, message: '请选择头像!' }]}
          >
            <ImgSelector />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              shape="round"
              size="large"
            >
              立即进入 <SwapRightOutlined />
            </Button>
          </Form.Item>
        </Form>
      </main>
    </div>
  );
};

export default connect()(Login);
