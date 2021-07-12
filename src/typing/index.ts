export enum IType {
  plan,
  knowledge,
  note,
}

export type PageType = 'manage' | 'plan' | 'knowledge' | 'note';

export interface IUserInfo {
  nickname: string;
  tx: string;
}

export type StatusType = "undone" | "doing" | "done" | "fail";

export interface IFormProps {
  key: string;
  type: IType;
  createTime: string;
  title?: string;
  content: string;
  weight?: number;
  startTime?: string;
  endTime?: string;
  status?: StatusType;
}

export interface IState {
  plans: IFormProps[];
  knowledges: IFormProps[];
  notes: IFormProps[];
  userInfo: Partial<IUserInfo>;
}