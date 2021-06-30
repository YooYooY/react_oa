import { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "./index.less";

moment.locale('zh-cn');

const Layout: FC = ({ children }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="layout-page">
        <header>header</header>
        <main>{children}</main>
        <footer>chenvl</footer>
      </div>
    </ConfigProvider>
  );
};

export default Layout;
