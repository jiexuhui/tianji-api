import * as debug from "debug";
import MySql from "../database/mysql";

const dbConfig = require("../configs/database/mysql.json");
const db = new MySql(dbConfig.admin.connConfig);

class Guessing {
  /**
   * 竞猜列表
   */
  public static async list(
    date: string,
    page: number,
    limit: number
  ) {
    return await db.execMultiple(
      "call p_bk_guessing_list(:date,:page,:limit)",
      { date, page, limit }
    );
  }

  /**
   * 添加竞猜
   * @param title
   * @param answer1
   * @param answer2
   * @param right
   * @param date
   */
  public static async add(
    title: string,
    answer1: string,
    answer2: string,
    right: number,
    date: string
  ) {
    return await db.exec("call p_bk_guessing_add(:title,:answer1,:answer2,:right,:date)", {
      title,
      answer1,
      answer2,
      right,
      date
    });
  }

  /**
   * 编辑竞猜
   * @param id
   * @param title
   * @param answer1
   * @param answer2
   * @param right
   * @param date
   */
  public static async edit(
    id: number,
    title: string,
    answer1: string,
    answer2: string,
    right: number,
    date: string
  ) {
    return await db.exec(
      "call p_bk_guessing_edit(:id,:title,:answer1,:answer2,:right,:date)",
      {
        id,
        title,
        answer1,
        answer2,
        right,
        date
      }
    );
  }

  /**
   * 删除竞猜
   * @param id
   */
  public static async delete(id: number) {
    return await db.exec("call p_bk_guessing_delete(:id)", { id });
  }
}
export default Guessing;
