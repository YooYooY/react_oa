import db from '@/utils/db';
import { history } from 'umi';
import { IUserInfo } from './typing';

const userInfo = db.get<IUserInfo>('user').value;

if (!userInfo){
    history.push("/login");
}
