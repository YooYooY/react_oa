import { useMemo } from 'react';
import db from '@/utils/db';
import { List, Divider, Card } from 'antd';
import { IFormProps } from '@/typing';

const ManagePage = () => {
  const plans = db.get<IFormProps[]>('plans').value || [];
  const notes = db.get<IFormProps[]>('notes').value || [];
  const knowledges = db.get<IFormProps[]>('knowledges').value || [];

  return (
    <div>
      <List
        header={<div>plan</div>}
        bordered
        dataSource={plans}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>
              <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
            </Card>
          </List.Item>
        )}
      />
      <Divider orientation="left"></Divider>
      <List
        header={<div>notes</div>}
        bordered
        dataSource={notes}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>
              <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
            </Card>
          </List.Item>
        )}
      />
      <Divider orientation="left"></Divider>
      <List
        header={<div>konwledges</div>}
        bordered
        dataSource={knowledges}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>
              <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ManagePage;
