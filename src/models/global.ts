import { Effect, Reducer, Subscription } from 'umi';
import db from '@/utils/db';
import { IUserInfo } from '@/typing';

export interface IglobalModelState {
  userInfo: Partial<IUserInfo>;
}

export interface IndexModelType {
  namespace: 'global';
  state: IglobalModelState;
  reducers: {
    saveUserInfo: Reducer<IglobalModelState>;
  };
  effects?: {
    query: Effect;
  };
  subscriptions?: { setup: Subscription };
}

const globalModel: IndexModelType = {
  namespace: 'global',
  state: {
    userInfo: db.get<IUserInfo>('user').value || {},
  },
  reducers: {
    saveUserInfo(state,{payload}){
      db.set("user", payload);
      return {
        ...state?.userInfo,
        userInfo: payload
      }
    }
  },
};

export default globalModel;
