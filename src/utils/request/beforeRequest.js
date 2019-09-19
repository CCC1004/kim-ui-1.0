import store from "@/store/index"
import {
  getToken
} from "@/utils/cookie";
import {
  getWIP,
  getNIP
} from '@/utils/sessionStorage';

export function  beforeRequest(config) {
  if (store.getters.token) {
    config.headers.Authorization = "bearer " + getToken();
  }
  // 添加外网和内网ip的请求头
  config.headers.Wip = getWIP();
  config.headers.Nip = getNIP();
}
