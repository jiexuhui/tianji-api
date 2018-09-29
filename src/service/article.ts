import * as debug from "debug";
import MySql from "../database/mysql";

const dbConfig = require("../configs/database/mysql.json");
const db = new MySql(dbConfig.admin.connConfig);

class Article {
  /**
   * 游戏列表
   */
  public static async list(title: string, page: number, limit: number) {
    return await db.execMultiple(
      "call p_bk_article_list(:title,:page,:limit)",
      {
        title,
        page,
        limit
      }
    );
  }

  /**
   * 添加文章
   * @param title
   * @param date
   * @param author
   */
  public static async add(
    title: string,
    date: string,
    author: string,
    content: number,
    status: number,
    matchid: number,
    tag: number
  ) {
    return await db.exec(
      "call p_bk_article_add(:title,:date,:author,:content,:status,:matchid,:tag)",
      {
        title,
        date,
        author,
        content,
        status,
        matchid,
        tag
      }
    );
  }

  /**
   * 编辑文章
   * @param id
   * @param game
   * @param logo
   */
  public static async edit(
    id: number,
    title: string,
    date: string,
    author: string,
    content: number,
    status: number,
    matchid: number,
    tag: number,
    image: string
  ) {
    return await db.exec(
      "call p_bk_article_edit(:id,:title,:date,:author,:content,:status,:matchid,:tag,:image)",
      {
        id,
        title,
        date,
        author,
        content,
        status,
        matchid,
        tag,
        image
      }
    );
  }

  /**
   * 删除article
   * @param id
   * @param game
   * @param logo
   */
  public static async delete(id: number) {
    return await db.exec("call p_bk_article_delete(:id)", { id });
  }
}
export default Article;
