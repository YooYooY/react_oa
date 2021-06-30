import { memo, useState, FC, useCallback, EventHandler } from 'react';
import { IFormProps, IUserInfo, PageType } from '@/typing';
import { Link } from 'umi';
import { Input, Badge, Modal, Form} from 'antd';
import moment from 'moment';
import classnames from 'classnames';
import { BellOutlined, PlusOutlined } from '@ant-design/icons';
import Logo from '@/assets/logo.png';
import './index.less';

interface IProp {
  onFormSubmit: (data: IFormProps) => void;
  userInfo: IUserInfo;
  pageType: PageType;
}

const HeaderComponent: FC<IProp> = (props) => {
  const [formType, setFormType] = useState(0);
  const { onFormSubmit, userInfo, pageType } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm<IFormProps>();

  const showEditModal = useCallback(() => setIsModalVisible(true), []);
  const hideEditModal = useCallback(() => setIsModalVisible(false), []);

  const handleOk = async () => {
    const values = await form.validateFields();
    const dateFormat = 'YYYY-MM-DD';
    if (formType === 0) {
      values.startTime = moment(values.startTime).format(dateFormat);
      values.endTime = moment(values.endTime).format(dateFormat);
      values.status = 'undone';
    }
    values.createTime = moment(new Date()).format(dateFormat);
    onFormSubmit && onFormSubmit(values);
    setIsModalVisible(false);
  };
  
  return (
    <header className="header-wrap">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <nav className="nav-wrap">
        <div
          className={classnames('nav-link', pageType === 'manage' && 'active')}
        >
          <Link to="/">数据大盘</Link>
        </div>
        <div
          className={classnames('nav-link', pageType === 'manage' && 'plan')}
        >
          <Link to="/plan">计划管理</Link>
        </div>
        <div
          className={classnames(
            'nav-link',
            pageType === 'knowledge' && 'active',
          )}
        >
          <Link to="/knowledge">知识管理</Link>
        </div>
        <div
          className={classnames('nav-link', pageType === 'note' && 'active')}
        >
          <Link to="/note">便签管理</Link>
        </div>
      </nav>
      <div className="search-bar">
        <Input placeholder="全站搜索" />
      </div>
      <div className="right-area">
        <div className="item">
          <Badge count={5}>
            <BellOutlined style={{ fontSize: 20 }} />
          </Badge>
        </div>
        <div className="item" onClick={showEditModal}>
          <PlusOutlined />
        </div>
        <div className="tx" title={userInfo.nickname}>
          <img src={userInfo.tx} />
        </div>
      </div>
      <Modal
        title="添加"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={hideEditModal}
        okText="保存"
      ></Modal>
    </header>
  );
};

export default memo(HeaderComponent);
