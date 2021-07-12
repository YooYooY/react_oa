import { ImmerReducer, Subscription } from 'umi';
import db from '@/utils/db';
import { IState, IUserInfo, IFormProps, IType } from '@/typing';
import { uuid } from '@/utils/tool';

export interface IndexModelType {
  namespace: 'global';
  state: IState;
  reducers: Record<string, ImmerReducer<IState>>;
  effects: {};
  subscriptions: { setup: Subscription };
}

const globalModel: IndexModelType = {
  namespace: 'global',
  state: {
    plans: db.get<IFormProps[]>('plans').value || [],
    knowledges: db.get<IFormProps[]>('knowledges').value || [],
    notes: db.get<IFormProps[]>('notes').value || [],
    userInfo: db.get<IUserInfo>('user').value || {},
  },
  reducers: {
    saveForm(state, { payload }) {
      payload.key = uuid();
      // plan
      if (payload.type === IType.plan) {
        const newData = [...state.plans, payload];
        db.set('plans', newData);
        state.plans = newData;
      }
      // knowledge
      if (payload.type === IType.knowledge) {
        const newData = [...state.knowledges, payload];
        db.set('knowledges', newData);
        state.knowledges = newData;
      }
      // note
      if (payload.type === IType.note) {
        const newData = [...state.notes, payload];
        db.set('notes', newData);
        state.notes = newData;
      }
    },
    delItem(state, { payload }) {
      if (payload.type === IType.plan) {
        const newData = db
          .get<IFormProps[]>('palns')
          .value!.filter((item) => item.key !== payload.key);
        state.plans = newData;
      }
      if (payload.type === IType.knowledge) {
        const newData = db
          .get<IFormProps[]>('knowledges')
          .value!.filter((item) => item.key !== payload.key);
        state.knowledges = newData;
      }
      if (payload.type === IType.plan) {
        const newData = db
          .get<IFormProps[]>('palns')
          .value!.filter((item) => item.key !== payload.key);
        state.plans = newData;
      }
    },
    editItem(state, { payload }) {
      const newData = state.plans.map((item) => {
        return item.key === payload.key
          ? { ...item, status: payload.status }
          : item;
      });
      db.set('plans', newData);
      state.plans = newData;
    },
    saveUserInfo(state, { payload }) {
      db.set('user', payload);
      state.userInfo = payload;
    },
    searchItem(state, { payload }) {
      const { type, keyword } = payload;

      if (type === IType.knowledge) {
        state.knowledges = (
          db.get<IFormProps[]>('knowledges')!.value || []
        ).filter(
          (item) =>
            item.title?.includes(keyword) || item.content.includes(keyword),
        );
      }

      if (type === IType.note) {
        state.notes = (db.get<IFormProps[]>('note')!.value || []).filter(
          (item) =>
            item.title?.includes(keyword) || item.content.includes(keyword),
        );
      }
    },
    clearAll(state){
      state.plans = [];
      state.knowledges = [];
      state.notes = [];
    }
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // console.log(`=>`, pathname);
      });
    },
  },
};

export default globalModel;
