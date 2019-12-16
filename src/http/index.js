import axios from "axios";
import { clientPort } from '../../config'
// 创建axios实例，执行baseUrl
const instance = axios.create({
  baseURL: `http://localhost:${clientPort}`,
  timeout: 1000,
});

export default instance