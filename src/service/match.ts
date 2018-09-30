import * as debug from "debug";
import MySql from "../database/mysql";
import { ILoginUser } from "../interface/loginusers";

const dbConfig = require("../configs/database/mysql.json");
const db = new MySql(dbConfig.admin.connConfig);

class Match {
  /**
   * 队伍列表
   * @param id
   * @param name
   * @param type
   * @param gameid
   * @param status
   * @param page
   * @param limit
   */
  public static async list(
    id: number,
    name: string,
    status: number,
    page: number,
    limit: number,
    seriseid: number
  ) {
    return await db.execMultiple(
      "call p_bk_match_list(:id,:name,:status,:page,:limit,:seriseid)",
      { id, name, status, page, limit, seriseid }
    );
  }

  /**
   * 添加队伍
   * @param name
   * @param logo
   * @param type
   * @param gameid
   * @param status
   */
  public static async add(
    name: string,
    desc: string,
    teams: string,
    gameid: number,
    status: number,
    sort: number,
    stime: string,
    etime: string,
    leftteam: number,
    leftscore: number,
    rightteam: number,
    rightscore: number,
    many: number,
    whitch: number,
    seriseid: number,
    ltower,
    rtower,
    lmoney,
    rmoney,
    ldragon,
    rdragon,
    lkill,
    rkill
  ) {
    return await db.exec(
      `call p_bk_match_add(:name,:desc,:teams,:gameid,:status,:sort,:stime,:etime,
        :leftteam,:leftscore,:rightteam,:rightscore,:many,:whitch,:seriseid,
        :ltower,:rtower,:lmoney,:rmoney,:ldragon,:rdragon,:lkill,:rkill)`,
      {
        name,
        desc,
        teams,
        gameid,
        status,
        sort,
        stime,
        etime,
        leftteam,
        leftscore,
        rightteam,
        rightscore,
        many,
        whitch,
        seriseid,
        ltower,
        rtower,
        lmoney,
        rmoney,
        ldragon,
        rdragon,
        lkill,
        rkill
      }
    );
  }

  /**
   * 编辑队伍
   * @param id
   * @param game
   * @param logo
   */
  public static async edit(
    id: number,
    name: string,
    desc: string,
    teams: string,
    gameid: number,
    status: number,
    sort: number,
    stime: string,
    etime: string,
    leftteam: number,
    leftscore: number,
    rightteam: number,
    rightscore: number,
    many: number,
    whitch: number,
    seriseid: number,
    ltower,
    rtower,
    lmoney,
    rmoney,
    ldragon,
    rdragon,
    lkill,
    rkill
  ) {
    return await db.exec(
      `call p_bk_match_edit(:id,:name,:desc,:teams,:gameid,:status,:sort,:stime,
        :etime,:leftteam,:leftscore,:rightteam,:rightscore,:many,:whitch,:seriseid,
        :ltower,:rtower,:lmoney,:rmoney,:ldragon,:rdragon,:lkill,:rkill)`,
      {
        id,
        name,
        desc,
        teams,
        gameid,
        status,
        sort,
        stime,
        etime,
        leftteam,
        leftscore,
        rightteam,
        rightscore,
        many,
        whitch,
        seriseid,
        ltower,
        rtower,
        lmoney,
        rmoney,
        ldragon,
        rdragon,
        lkill,
        rkill
      }
    );
  }

  /**
   * 删除游戏
   * @param id
   */
  public static async delete(id: number) {
    return await db.exec("call p_bk_match_delete(:id)", {
      id
    });
  }
}
export default Match;
