export interface IUserInfo {
  nickname: string;
  tx: string;
}

export type PageType = 'manage' | 'plan' | 'knowledge' | 'note';
export type StatusType = "undone" | "doing" | "done" | "fail";

export interface IFormProps {
  key: string;
  type: number;
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