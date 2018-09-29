import * as debug from "debug";
import { NextFunction, Request, Response } from "express";
import msgCode from "../compoents/msgcode";
const debugLog = debug("api:controller:api");

import co from "co";
import * as fs from "fs";
import ossconfig from "../compoents/oss";
import Tools from "../compoents/tools";
import dbBanner from "../service/banner";
import dbSystem from "../service/system";

const OSS = require("ali-oss");
const client = new OSS(ossconfig);

class Banner {
  /**
   * 获取游戏列表
   * @param req
   * @param res
   * @param next
   */
  public static async list(req: Request, res: Response, next: NextFunction) {
    const { name = "", status = 0, page = 1, limit = 20 } = req.body;
    await dbBanner
      .list(name, status === "" ? 0 : status, page, limit)
      .then(data => {
        dbSystem.addoperatelog(
          req.session.user.username,
          "查看banner列表",
          "查看banner列表，参数》》》" + JSON.stringify(req.body)
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
    const { name = "", picture = "", url = "", status = 0 } = req.body;
    await dbBanner
      .add(name, picture, url, status)
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "添加Banner",
          "添加Banner，参数》》》" + JSON.stringify(req.body)
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
    const { id = 0, name = "", picture = "", url = "", status = 0 } = req.body;
    await dbBanner
      .edit(id, name, picture, url, status)
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "编辑banner",
          "编辑banner，参数》》》" + JSON.stringify(req.body)
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
    await dbBanner
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
        "game/banner/" + files[0].originalname,
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
export default Banner;
