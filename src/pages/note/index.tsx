import { ConnectRC } from 'umi';
import { connect } from 'react-redux';
import { IFormProps, IState } from '@/typing';
import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.less';
import Empty from '@/components/Empty';

interface IProps {
  notes: Array<IFormProps>;
}

const NotePage: ConnectRC<IProps> = (props) => {
  const { notes, dispatch } = props;
  
  if (!notes || !notes.length) return <Empty />;

  const handleDel = (row: { key: string; type: number }) => {
    dispatch({
      type: 'global/delItem',
      payload: row,
    });
  };

  return (
    <div className="note-page">
      <div className="content box">
        {notes.map((item) => (
          <div className="item mix-item doing" key={item.key}>
            <div
              className="desc"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
            <div className="edit-area">
              <Popconfirm
                title="确认删除此知识吗？"
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

export default connect((state: { global: IState }) => state.global)(NotePage);
