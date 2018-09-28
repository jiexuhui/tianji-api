import * as debug from "debug";
import MySql from "../database/mysql";
import { ILoginUser } from "../interface/loginusers";

const dbConfig = require("../configs/database/mysql.json");
const db = new MySql(dbConfig.admin.connConfig);

class Api {
  /**
   * 保存用户信息
   * @param params
   */
  public static async saveuserinfo(params: {
    avatarUrl: string;
    city: string;
    country: string;
    gender: number;
    isbook: number;
    language: string;
    nickName: string;
    openid: string;
    phone: string;
    province: string;
    realname: string;
    taobao: string;
    wechat: string;
    formId: string;
  }) {
    return await db.exec(
      "call p_api_add_anchor(:avatarUrl,:city,:country,:gender,:isbook" +
        ",:language,:nickName,:openid,:phone,:province,:realname,:taobao,:wechat,:formId)",
      params
    );
  }

  /**
   * 获取首页活动
   */
  public static async getActivityInfo(openid: string) {
    return await db.execMultiple("call p_api_activity_list(:openid)", {
      openid
    });
  }

  /**
   * 选择队伍
   */
  public static async selectTeam(
    matchid: number,
    openid: string,
    teamid: number
  ) {
    return await db.exec("call p_api_select_team(:matchid,:openid,:teamid)", {
      matchid,
      openid,
      teamid
    });
  }

  /**
   * 赛事列表
   * @param gametype
   */
  public static async matchList(gametype: number) {
    return await db.execMultiple("call p_api_match_list(:gametype)", {
      gametype
    });
  }

  /**
   * 赛事相关文章
   * @param gametype
   */
  public static async getMatchArticles(matchid: number) {
    return await db.execMultiple("call p_api_match_articles(:matchid)", {
      matchid
    });
  }
}
export default Api;
