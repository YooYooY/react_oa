import { memo, useState, FC, useCallback, EventHandler } from 'react';
import { IFormProps, IUserInfo, PageType, IType } from '@/typing';
import { Link } from 'umi';
import { Input, Badge, Modal, Form, Radio, Select, DatePicker } from 'antd';
import moment from 'moment';
import RichText from '@/components/RichText';
import classnames from 'classnames';
import { BellOutlined, PlusOutlined } from '@ant-design/icons';
import Logo from '@/assets/logo.png';
import './index.less';

interface IProp {
  onFormSubmit: (data: IFormProps) => void;
  userInfo: IUserInfo;
  pageType: PageType;
}

const options = [
  { label: '计划', value: IType.plan },
  { label: '知识', value: IType.knowledge },
  { label: '便签', value: IType.note },
];

const weightOptions = [
  { label: '紧急', value: 0 },
  { label: '重要', value: 1 },
  { label: '一般', value: 2 },
  { label: '不重要', value: 3 },
];


const HeaderComponent: FC<IProp> = (props) => {
  const [formType, setFormType] = useState(IType.plan);
  const { onFormSubmit, userInfo, pageType } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm<IFormProps>();

  const showEditModal = useCallback(() => setIsModalVisible(true), []);
  const hideEditModal = useCallback(() => setIsModalVisible(false), []);

  const handleOk = async () => {
    const values = await form.validateFields();
    const dateFormat = 'YYYY-MM-DD';
    if (formType === IType.plan) {
      values.startTime = moment(values.startTime).format(dateFormat);
      values.endTime = moment(values.endTime).format(dateFormat);
      values.status = 'undone';
    }
    values.createTime = moment(new Date()).format(dateFormat);
    onFormSubmit && onFormSubmit(values);
    setIsModalVisible(false);
  };

  const onChange: EventHandler<any> = (e) => {
    setFormType(e.target.value);
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
          className={classnames('nav-link', pageType === 'plan' && 'active')}
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
      >
        <Form
          name="addTask"
          size="large"
          form={form}
          initialValues={{ type: IType.plan }}
        >
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择记录类型' }]}
          >
            <Radio.Group
              options={options}
              onChange={onChange}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          {formType !== IType.note && (
            <Form.Item
              name="title"
              label="标题"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input placeholder="请输入标题" />
            </Form.Item>
          )}
          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <RichText />
          </Form.Item>
          {formType === IType.plan && (
            <>
              <Form.Item
                name="weight"
                label="重要性"
                rules={[{ required: true, message: '请输入计划等级' }]}
              >
                <Select options={weightOptions} placeholder="请输入计划等级" />
              </Form.Item>
              <div style={{ display: 'flex' }}>
                <Form.Item
                  name="startTime"
                  label="开始时间"
                  rules={[{ required: true, message: '计划开始时间' }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  name="endTime"
                  label="结束时间"
                  rules={[{ required: true, message: '计划结束时间' }]}
                  style={{ marginLeft: '12px' }}
                >
                  <DatePicker />
                </Form.Item>
              </div>
            </>
          )}
        </Form>
      </Modal>
    </header>
  );
};

export default memo(HeaderComponent);
