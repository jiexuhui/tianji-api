import * as debug from "debug";
import { md5 } from "./crypto";
import msgCode from "./msgcode";

import yeziconfig from "../configs/common/yezi";
import yezi from "../routes/yezi";

const debugLog = debug("api:controller:tools");
/**
 * 工具类
 *
 * @class Tools
 */
class Tools {
  /**
   * 通用查询结果处理
   *
   * @static
   * @param {[object]} data 数据库中查询出的数据
   * @returns 返回数组
   * @memberof Tools
   */
  public static handleResult(data: any[] | any) {
    msgCode.success.data = [];
    if (data && data.length > 0) {
      const result = data;
      if (result && result.length > 0) {
        // 如果是返回的数据库中的错误码
        if (result[0] && result[0].code) {
          const code = result[0].code;
          let msg = "";
          for (const key in msgCode) {
            if (msgCode.hasOwnProperty(key)) {
              const element = msgCode[key];
              if (element.code === code) {
                msg = element.msg;
                break;
              }
            }
          }
          result[0].msg = msg;
          return result[0];
        }
        msgCode.success.data = result;
        return msgCode.success;
      }
      return [];
    }
    return [];
  }
  /**
   * 查询结果处理 - 返回一条
   *
   * @static
   * @param {any[]} data 数据库中查询出的数据
   * @returns 返回对象
   * @memberof Tools
   */
  public static handleResultOne(data: any[]) {
    const result = this.handleResult(data);
    return result.length === 0 ? null : result[0];
  }

  public static modifyUrl(url: string) {
    let queryString = url.substr(url.indexOf("?") + 1);

    queryString = this.sort(
      queryString + `&app_secret=${yeziconfig.app_secret}`
    );
    // debugLog("queryString排序后：：", queryString);
    const sign = md5(queryString);
    // debugLog("sign：：", sign);
    const newurl = url + "&sign=" + sign;
    // debugLog("newurl", newurl);
    return newurl;
  }

  /**
   * URL参数按字典排序
   * @param url
   */
  public static sort(queryString: string) {
    const strArr = queryString.split("&");
    strArr.sort();
    return strArr.join("&");
  }
}

export default Tools;
