import { Effect, ImmerReducer, Subscription } from 'umi';
import db from '@/utils/db';
import { IState, IUserInfo } from '@/typing';

export interface IndexModelType {
  namespace: 'global';
  state: IState;
  reducers: {
    saveForm: ImmerReducer<IState>;
    saveUserInfo: ImmerReducer<IState>;
  };
  effects: {};
  subscriptions: { setup: Subscription };
}

const globalModel: IndexModelType = {
  namespace: 'global',
  state: {
    plans: [],
    knowledges: [],
    notes: [],
    userInfo: db.get<IUserInfo>('user').value || {},
  },
  reducers: {
    saveForm(state, { payload }) {},
    saveUserInfo(state, { payload }) {
      db.set('user', payload);
      state.userInfo = payload;
    },
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
