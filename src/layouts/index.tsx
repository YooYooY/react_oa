import { useCallback, useMemo } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';
import { connect } from 'react-redux';
import { IUserInfo, IFormProps, PageType } from '@/typing';
import Header from './Header';
import { ConnectRC } from '@/.umi/plugin-dva/connect';

moment.locale('zh-cn');

const Layout: ConnectRC<{ userInfo: IUserInfo }> = (props) => {
  const {
    children,
    dispatch,
    userInfo,
    location: { pathname },
  } = props;

  const handleFormSave = useCallback((data: IFormProps) => {
    dispatch({
      type: 'global/saveForm',
      payload: data,
    });
  }, []);

  const pageType = useMemo(() => pathname.slice(1) as PageType, [pathname]);

  return (
    <ConfigProvider locale={zhCN}>
      <div className="layout-page">
        <Header
          userInfo={userInfo}
          onFormSubmit={handleFormSave}
          pageType={pageType}
        />
        <main>{children}</main>
        <footer>
          create by <a href="https://youyoucuocuo.top/post/about" target="_blank">chenvl</a>
        </footer>
      </div>
    </ConfigProvider>
  );
};

export default connect(({ global }: { global: { userInfo: IUserInfo } }) => {
  return { userInfo: global.userInfo };
})(Layout);
