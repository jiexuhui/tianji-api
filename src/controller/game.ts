import axios from "axios";
import * as debug from "debug";
import { NextFunction, Request, Response } from "express";
import msgCode from "../compoents/msgcode";
const debugLog = debug("api:controller:api");
import wechatconfig from "../configs/common/wechat";

import Tools from "../compoents/tools";
import dbGame from "../service/game";
import dbSystem from "../service/system";

class Game {
  /**
   * 获取游戏列表
   * @param req
   * @param res
   * @param next
   */
  public static async list(req: Request, res: Response, next: NextFunction) {
    const { id = 0, game = "", page = 1, limit = 20 } = req.body;
    await dbGame
      .list(id, game, page, limit)
      .then(data => {
        dbSystem.addoperatelog(
          req.session.user.username,
          "查看游戏列表",
          "查看游戏列表，参数》》》" + JSON.stringify(req.body)
        );
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }
}
export default Game;
