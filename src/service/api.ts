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
    language: string;
    nickName: string;
    openid: string;
    province: string;
  }) {
    return await db.exec(
      `call p_api_add_user(:avatarUrl,:city,:country,:gender,:language,
        :nickName,:openid,:province)`,
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

  /**
   * 获取首页BANNER
   * @param gametype
   */
  public static async getBanners() {
    return await db.execMultiple("call p_api_banners()");
  }
}
export default Api;
