import * as debug from "debug";
import MySql from "../database/mysql";

const dbConfig = require("../configs/database/mysql.json");
const db = new MySql(dbConfig.admin.connConfig);

class Banner {
  /**
   * 游戏列表
   */
  public static async list(
    name: string,
    status: string,
    page: number,
    limit: number
  ) {
    return await db.execMultiple(
      "call p_bk_banner_list(:name,:status,:page,:limit)",
      { name, status, page, limit }
    );
  }

  /**
   * 添加banner
   * @param game
   * @param logo
   */
  public static async add(
    name: string,
    picture: string,
    url: string,
    status: number
  ) {
    return await db.exec("call p_bk_banner_add(:name,:picture,:url,:status)", {
      name,
      picture,
      url,
      status
    });
  }

  /**
   * 编辑banner
   * @param id
   * @param game
   * @param logo
   */
  public static async edit(
    id: number,
    name: string,
    picture: string,
    url: string,
    status: number
  ) {
    return await db.exec(
      "call p_bk_banner_edit(:id,:name,:picture,:url,:status)",
      {
        id,
        name,
        picture,
        url,
        status
      }
    );
  }

  /**
   * 删除banner
   * @param id
   * @param game
   * @param logo
   */
  public static async delete(id: number) {
    return await db.exec("call p_bk_banner_delete(:id)", { id });
  }
}
export default Banner;
