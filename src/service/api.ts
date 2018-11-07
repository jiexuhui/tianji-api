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

  /**
   * 获取文章详情
   * @param gametype
   */
  public static async getArticleDetail(articleid: number) {
    return await db.exec("call p_api_article_detail(:articleid)", {
      articleid
    });
  }

  /**
   * 添加实时对话
   * @param gametype
   */
  public static async addChatLog(
    openid: string,
    content: string,
    matchid: number
  ) {
    return await db.exec("call p_api_chatlogs_add(:openid,:content,:matchid)", {
      openid,
      content,
      matchid
    });
  }

  /**
   * 实时对话列表
   * @param gametype
   */
  public static async getChatLogs(openid: string, matchid: number) {
    return await db.execMultiple("call p_api_chat_logs(:openid,:matchid)", {
      openid,
      matchid
    });
  }

  /**
   * 获取赛事列表
   * @param gametype
   */
  public static async seriseList() {
    return await db.execMultiple("call p_api_serise_list()", {});
  }

  /**
   * 获取赛事详情
   * @param gametype
   */
  public static async seriseDetail(seriseid: number) {
    return await db.execMultiple("call p_api_serise_detail(:seriseid)", {
      seriseid
    });
  }

  /**
   * 获取竞猜列表
   * @param gametype
   */
  public static async guessings(openid: string) {
    return await db.execMultiple("call p_api_guessing_list(:openid)", {
      openid
    });
  }

  /**
   * 选择竞猜答案
   * @param gametype
   */
  public static async answerGuessing(
    guessid: number,
    openid: string,
    answer: number
  ) {
    return await db.exec(
      "call p_api_answer_guessing(:guessid,:openid,:answer)",
      {
        guessid,
        openid,
        answer
      }
    );
  }

  /**
   * 填写领奖信息
   * @param gametype
   */
  public static async wechatInfo(
    openid: number,
    phone: string,
    wechat: number
  ) {
    return await db.exec("call p_api_wechat_info(:openid,:phone,:wechat)", {
      openid,
      phone,
      wechat
    });
  }

  /**
   * 申请成为大神
   * @param uid
   */
  public static async applyGod(uid: number) {
    return await db.exec("call p_api_apply_god(:uid)", {
      uid
    });
  }

  /**
   * 申请成为大神
   * @param uid
   */
  public static async pushCases(uid: number) {
    return await db.execMultiple("call p_api_pushcase_list(:uid)", {
      uid
    });
  }
}
export default Api;
