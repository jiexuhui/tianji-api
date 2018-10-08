import * as debug from "debug";
import MySql from "../database/mysql";
import { ILoginUser } from "../interface/loginusers";

const dbConfig = require("../configs/database/mysql.json");
const db = new MySql(dbConfig.admin.connConfig);

class Team {
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
    type: number,
    gameid: number,
    status: number,
    page: number,
    limit: number
  ) {
    return await db.execMultiple(
      "call p_bk_team_list(:id,:name,:type,:gameid,:status,:page,:limit)",
      { id, name, type, gameid, status, page, limit }
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
    logo: string,
    type: number,
    gameid: number,
    status: number
  ) {
    return await db.exec(
      "call p_bk_team_add(:name,:logo,:type,:gameid,:status)",
      {
        name,
        logo,
        type,
        gameid,
        status
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
    logo: string,
    type: number,
    gameid: number,
    status: number,
    pic: string
  ) {
    return await db.exec(
      "call p_bk_team_edit(:id,:name,:logo,:type,:gameid,:status,:pic)",
      {
        id,
        name,
        logo,
        type,
        gameid,
        status,
        pic
      }
    );
  }

  /**
   * 删除游戏
   * @param id
   */
  public static async delete(id: number) {
    return await db.exec("call p_bk_team_delete(:id)", {
      id
    });
  }
}
export default Team;
