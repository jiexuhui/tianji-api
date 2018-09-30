import * as debug from "debug";
import MySql from "../database/mysql";
import { ILoginUser } from "../interface/loginusers";

const dbConfig = require("../configs/database/mysql.json");
const db = new MySql(dbConfig.admin.connConfig);

class Serise {
  /**
   * 赛事列表
   * @param name
   * @param status
   * @param page
   * @param limit
   */
  public static async list(
    name: string,
    status: number,
    gameid: number,
    page: number,
    limit: number
  ) {
    return await db.execMultiple(
      "call p_bk_serise_list(:name,:status,:gameid,:page,:limit)",
      { name, status, gameid, page, limit }
    );
  }

  /**
   * 添加赛事
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
    image: string,
    many: number,
    status: number,
    stime: string,
    etime: string,
    lteam: number,
    lscore: number,
    rteam: number,
    rscore: number,
    whitch: number
  ) {
    return await db.exec(
      `call p_bk_serise_add(:name,:desc,:teams,:gameid,:image,:many,:status,
        :stime,:etime,:lteam,:lscore,:rteam,:rscore,:whitch)`,
      {
        name,
        desc,
        teams,
        gameid,
        image,
        many,
        status,
        stime,
        etime,
        lteam,
        lscore,
        rteam,
        rscore,
        whitch
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
    image: string,
    many: number,
    status: number,
    stime: string,
    etime: string,
    lteam: number,
    lscore: number,
    rteam: number,
    rscore: number,
    whitch: number
  ) {
    return await db.exec(
      `call p_bk_serise_edit(:id,:name,:desc,:teams,:gameid,:image,:many,
        :status,:stime,:etime,:lteam,:lscore,:rteam,:rscore,:whitch)`,
      {
        id,
        name,
        desc,
        teams,
        gameid,
        image,
        many,
        status,
        stime,
        etime,
        lteam,
        lscore,
        rteam,
        rscore,
        whitch
      }
    );
  }

  /**
   * 删除游戏
   * @param id
   */
  public static async delete(id: number) {
    return await db.exec("call p_bk_serise_delete(:id)", {
      id
    });
  }
}
export default Serise;
