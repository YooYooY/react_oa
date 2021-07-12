import { connect, ConnectRC } from 'umi';
import { StatusType, IState } from '@/typing';
import { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import moment, { Moment } from 'moment';
import { Calendar, Badge } from 'antd';
import { knowledgesMock, notesMock, plansMock } from './data';
import Chart from '@/components/VisualComponents/Chart';
import Line from '@/components/VisualComponents/Line';
import Pie from '@/components/VisualComponents/Pie';
import "./index.less"

const ManagePage: ConnectRC<IState> = (props) => {
  const { plans, notes, knowledges } = props;
  const manageData = useMemo(
    () => [
      {
        name: '总计划数',
        num: plans.length,
        type: 'plans',
      },
      {
        name: '已完成计划',
        num: plans.filter((item) => item.status === 'done').length,
        type: 'done',
      },
      {
        name: '进行中计划',
        num: plans.filter((item) => item.status === 'doing').length,
        type: 'undone',
      },
      {
        name: '知识总量',
        num: knowledges.length,
        type: 'daily',
      },
      {
        name: '便签数',
        num: notes.length,
        type: 'note',
      },
    ],
    [notes, plans, knowledges],
  );

  const getListData = useCallback(
    (value: Moment) => {
      type listStatusType = 'success' | 'processing' | 'default' | 'error';
      type LType = Record<StatusType, listStatusType>;
      const listData: Array<{ type: listStatusType; title: string }> = [];
      const type: LType = {
        done: 'success',
        doing: 'processing',
        undone: 'default',
        fail: 'error',
      };
      plans.forEach((item) => {
        if (moment(item.startTime).date() === value.date()) {
          listData.push({
            type: type[item.status || 'undone'],
            title: item.title || '',
          });
        }
      });
      return listData;
    },
    [plans],
  );

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listData.map((item, i) => (
          <li key={i}>
            <Badge status={item.type} text={item.title}></Badge>
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = useCallback(
    (value: Moment) =>
      plans.filter((item) => moment(item.createTime).month() === value.month())
        .length,
    [plans],
  );
  
  const monthCellRender = (value:Moment)=>{
    const num = getMonthData(value);
    return num && (<div className="notes-month">
      <section>{num}</section>
      <span>本月计划数</span>
    </div>);
  }

  return (
    <div className="manage-page">
      <div className="header-title">
        <h3>欢迎使用成长助手！</h3>
        <p>轻松智能的管理你的所见·所思·所写</p>
      </div>
      <div className="statics-panel">
        {manageData.map((item, i) => (
          <div className={classnames('panel-item', item.type)} key={i}>
            <div className="panel-text">{item.name}</div>
            <div className="panel-num">{item.num}</div>
          </div>
        ))}
      </div>
      <div className="header-title">
        <h3>个人纬度分析</h3>
        <p>你的个人分析助手</p>
      </div>
      <div className="data-graph">
        <div className="data-row">
          <div className="title">每周新学习知识分析</div>
          <div className="graph">
            <Chart data={knowledgesMock}></Chart>
          </div>
        </div>
        <div className="data-row">
          <div className="title">便签每日趋势分析</div>
          <div className="graph">
            <Line data={notesMock}></Line>
          </div>
        </div>
        <div className="data-row">
          <div className="title">计划指标</div>
          <div className="graph">
            <Pie data={plansMock} />
          </div>
        </div>
      </div>
      <div className="header-title">
        <h3>计划日历</h3>
        <p>不让你错过每个重要的事件~</p>
      </div>
      <div className="calendar-wrap">
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
        />
      </div>
    </div>
  );
};

export default connect((state: { global: IState }) => state.global)(ManagePage);
