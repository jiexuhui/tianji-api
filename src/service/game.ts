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
}
export default Game;
