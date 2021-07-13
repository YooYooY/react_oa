import { ConnectRC } from 'umi';
import { connect } from 'react-redux';
import { IFormProps, IState } from '@/typing';
import { useEffect, useRef } from 'react';
import classnames from 'classnames';
import mixitup from 'mixitup';
import {
  CheckOutlined,
  DeleteOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Radio, Tooltip, Popconfirm, message } from 'antd';
import "./index.less";

interface IProps {
  plans: Array<IFormProps>;
}

const options = [
  { label: '全部', value: 'mix-item' },
  { label: '已完成', value: 'done' },
  { label: '进行中', value: 'doing' },
  { label: '待办', value: 'undone' },
  { label: '已失败', value: 'fail' },
];

const PlanPage: ConnectRC<IProps> = (props) => {
  const { plans, dispatch } = props;
  const mixer = useRef<Mixitup>();
  const onFilterChange = (e: any) => {
    mixer.current?.filter(`.${e.target.value}`);
  };

  useEffect(() => {
    mixer.current = mixitup('.box', {
      selectors: {
        target: '.mix-item',
      },
      animation: {
        duration: 300,
      },
    });
  }, []);

  const handleEdit = (key: string, status: string) => {
    dispatch({
      type: 'global/editItem',
      payload: { key, status },
    });
  };

  const handleDel = async (row: { key: string; type: number }) => {
    await dispatch({
      type: 'global/delItem',
      payload: row,
    });
    message.success('更新成功！');
  };
  
  return (
    <div className="plan-page">
      <div className="filter-wrap">
        <Radio.Group
          options={options}
          onChange={onFilterChange}
          defaultValue="mix-item"
          optionType="button"
          buttonStyle="solid"
          size="large"
        />
      </div>
      <div className="content box">
        {plans.map((item) => (
          <div
            className={classnames('item', 'mix-item', item.status)}
            key={item.key}
          >
            <div className="title">{item.title}</div>
            <div
              className="desc"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
            <div className="edit-area">
              <Tooltip placement="bottom" title="标记为已完成">
                <span onClick={() => handleEdit(item.key, 'done')}>
                  <CheckOutlined />
                </span>
              </Tooltip>
              <Tooltip placement="bottom" title="放弃计划">
                <span onClick={() => handleEdit(item.key, 'fail')}>
                  <CloseOutlined />
                </span>
              </Tooltip>
              <Popconfirm
                title="确认删除此计划吗？"
                onConfirm={() => handleDel({ key: item.key, type: item.type })}
                okText="是的"
                cancelText="取消"
              >
                  <DeleteOutlined />
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect((state:{global:IState}) => state.global)(PlanPage);
