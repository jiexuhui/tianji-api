import * as debug from "debug";
import { NextFunction, Request, Response } from "express";
import msgCode from "../compoents/msgcode";
const debugLog = debug("api:controller:api");

import co from "co";
import * as fs from "fs";
import ossconfig from "../compoents/oss";
import Tools from "../compoents/tools";
import dbGame from "../service/game";
import dbSystem from "../service/system";

const OSS = require("ali-oss");
const client = new OSS(ossconfig);

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
      .list(id === 0 ? "" : id, game, page, limit)
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

  /**
   * 添加游戏
   * @param req
   * @param res
   * @param next
   */
  public static async add(req: Request, res: Response, next: NextFunction) {
    const { game = "", logo = "" } = req.body;
    await dbGame
      .add(game, logo)
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "添加游戏",
          "添加游戏，参数》》》" + JSON.stringify(req.body)
        );
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }

  /**
   * 编辑游戏
   * @param req
   * @param res
   * @param next
   */
  public static async edit(req: Request, res: Response, next: NextFunction) {
    const { id = 0, game = "", logo = "" } = req.body;
    await dbGame
      .edit(id, game, logo)
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "编辑游戏",
          "编辑游戏，参数》》》" + JSON.stringify(req.body)
        );
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }

  /**
   * 删除游戏
   * @param req
   * @param res
   * @param next
   */
  public static async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id;
    await dbGame
      .delete(id)
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "删除游戏",
          "删除游戏，参数》》》" + JSON.stringify(req.body)
        );
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }

  /**
   * 上传Logo
   * @param req
   * @param res
   * @param next
   */
  public static async upload(req: any, res: Response, next: NextFunction) {
    const files = req.files;
    debug("api:upload")("file:%o", req.files);
    const filename = "uploads/" + files[0].filename;
    co(function*() {
      client.useBucket("topimgs");
      const result = yield client.put(
        "game/logo/" + files[0].originalname,
        filename
      );
      const list = yield client.list();
      debug("api:upload:")("list:", result);
      fs.unlinkSync(filename);
      msgCode.success.data = result;
      res.json(msgCode.success);
      return;
    }).catch(err => {
      next(err);
      debug("api:upload:%j")("err:", err);
    });
  }
}
export default Game;
