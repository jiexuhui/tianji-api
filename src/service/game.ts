import * as debug from "debug";
import MySql from "../database/mysql";
import { ILoginUser } from "../interface/loginusers";

const dbConfig = require("../configs/database/mysql.json");
const db = new MySql(dbConfig.admin.connConfig);

class Game {
  /**
   * 游戏列表
   */
  public static async list(
    id: number,
    game: string,
    page: number,
    limit: number
  ) {
    return await db.execMultiple(
      "CALL p_bk_game_list(:id,:game,:page,:limit)",
      { id, game, page, limit }
    );
  }

  /**
   * 添加游戏
   * @param game
   * @param logo
   */
  public static async add(game: string, logo: string) {
    return await db.exec("CALL p_bk_game_add(:game,:logo)", {
      game,
      logo
    });
  }

  /**
   * 编辑游戏
   * @param id
   * @param game
   * @param logo
   */
  public static async edit(id: number, game: string, logo: string) {
    return await db.exec("call p_bk_game_edit(:id,:game,:logo)", {
      id,
      game,
      logo
    });
  }

  /**
   * 编辑游戏
   * @param id
   * @param game
   * @param logo
   */
  public static async delete(id: number) {
    return await db.exec("call p_bk_game_delete(:id)", {
      id
    });
  }
}
export default Game;
