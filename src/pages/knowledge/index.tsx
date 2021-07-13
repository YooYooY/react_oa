import { ConnectRC } from 'umi';
import { connect } from 'react-redux';
import { IFormProps, IState } from '@/typing';
import { Input, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';import './index.less';

const { Search } = Input;

interface IProps {
  knowledges: Array<IFormProps>;
}

const KnowledgePage: ConnectRC<IProps> = (props) => {
  const { knowledges, dispatch } = props;
  const onSearch = (keyword: string)=>{
      dispatch({
          type: "global/searchItem",
          payload:{type:1, keyword}
      })
  }
  
  const handleDel = (row:{key: string, type: number})=>{
      dispatch({
          type: "global/delItem",
          payload: row
      })
  }

  return (
    <div className="knowledge-page">
      <div className="search-wrap">
        <Search
          placeholder="请输入关键字进行搜索"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div className="content box">
        {knowledges.map((item) => (
          <div className="item mix-item doing" key={item.key}>
            <div className="title">{item.title}</div>
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

export default connect((state: { global: IState }) => state.global)(KnowledgePage);
