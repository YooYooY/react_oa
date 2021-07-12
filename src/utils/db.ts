enum STORE_STATUS {
  SUCCESS = 'success',
  FAILURE = 'fail',
  OVERFLOW = 'overflow',
  TIMEOUT = 'timeout',
}

type SET_CALLBACK = (status: STORE_STATUS, key: string, value: any) => void;
type GET_CALLBACK = (status: STORE_STATUS, value: any) => void;
type REMOVE_CALLBACK = (status: STORE_STATUS, value: any) => void;

interface getResult<T> {
  status: STORE_STATUS;
  value: T | null;
}

class BaseLocalStorage {
  storage = localStorage || window.localStorage;
  constructor(private preId = '', private timeSign = '|-|') {}

  getKey(key: string) {
    return this.preId + key;
  }

  set(
    key: string,
    value: any,
    cb?: SET_CALLBACK,
    time?: number | string | Date,
  ) {
    let status = STORE_STATUS.SUCCESS;
    value = JSON.stringify(value);
    key = this.getKey(key);
    
    try {
      time =
        new Date(time as number | string).getTime() || (time as Date).getTime();
    } catch (e) {
      // todo 默认一个月，这个应用就不设置过期时间了
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31 * 99999;
    }

    try {
      this.storage.setItem(key, time + this.timeSign + value);
    } catch (e) {
      status = STORE_STATUS.OVERFLOW;
    }

    cb && cb.call(this, status, key, value);
  }

  get<T>(key: string, cb?: GET_CALLBACK): getResult<T> {
    let status = STORE_STATUS.SUCCESS;
    let value = null as any;
    key = this.getKey(key);

    let result = {} as getResult<T>;
    try {
      value = this.storage.getItem(key);
    } catch (e) {
      result = {
        status: STORE_STATUS.FAILURE,
        value: null,
      };
      return result;
    }

    if (value) {
      let [time, valueStr] = value.split(this.timeSign);
      if (time * 1 < Date.now()) {
        value = null;
        status = STORE_STATUS.TIMEOUT;
        this.remove(key);
      } else {
        try{
          value = JSON.parse(valueStr);
        }catch(err){
          value = null;
        }
      }
    } else {
      status = STORE_STATUS.FAILURE;
    }

    result = {
      status,
      value,
    };

    cb && cb.call(this, status, value);

    return result;
  }

  remove(key: string, cb?: REMOVE_CALLBACK) {
    let status = STORE_STATUS.FAILURE;
    let value = null as null | any;
    key = this.getKey(key);
    try {
      value = this.storage.getItem(key);
    } catch (error) {
      // do someing
    }
    if (value) {
      try {
        this.storage.removeItem(key);
        status = STORE_STATUS.SUCCESS;
      } catch (e) {
        // do someing
      }
    }
    cb && cb.call(this, status, value);
  }
}

const store = new BaseLocalStorage('');

export default store;
