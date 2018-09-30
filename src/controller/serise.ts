import * as debug from "debug";
import { NextFunction, Request, Response } from "express";
import msgCode from "../compoents/msgcode";
const debugLog = debug("api:controller:api");

import co from "co";
import * as fs from "fs";
import ossconfig from "../compoents/oss";
import Tools from "../compoents/tools";
import dbSerise from "../service/serise";
import dbSystem from "../service/system";

const OSS = require("ali-oss");
const client = new OSS(ossconfig);

class Serise {
  /**
   * 获取赛事列表
   * @param req
   * @param res
   * @param next
   */
  public static async list(req: Request, res: Response, next: NextFunction) {
    const { name = "", status = 0, gameid = 0, page = 1, limit = 20 } = req.body;
    await dbSerise
      .list(name, status === "" ? 0 : status, gameid === "" ? 0 : gameid, page, limit)
      .then(data => {
        dbSystem.addoperatelog(
          req.session.user.username,
          "获取赛事列表",
          "获取赛事列表，参数》》》" + JSON.stringify(req.body)
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
    const {
      name = "",
        desc = "",
        teams = "",
        gameid = 0,
        image = "",
        many = 1,
        status = 1,
        stime = "",
        etime = ""
    } = req.body;
    await dbSerise
      .add(
        name,
        desc,
        teams,
        gameid,
        image,
        many,
        status,
        stime,
        etime
      )
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "添加赛事",
          "添加赛事，参数》》》" + JSON.stringify(req.body)
        );
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }

  /**
   * 编辑赛事
   * @param req
   * @param res
   * @param next
   */
  public static async edit(req: Request, res: Response, next: NextFunction) {
    const {
      id = 0,
      name = "",
      desc = "",
      teams = "",
      gameid = 0,
      image = "",
      many = 1,
      status = 1,
      stime = "",
      etime = ""
    } = req.body;
    await dbSerise
      .edit(
        id,
        name,
        desc,
        teams,
        gameid,
        image,
        many,
        status,
        stime,
        etime
      )
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "编辑赛事",
          "编辑赛事，参数》》》" + JSON.stringify(req.body)
        );
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }

  /**
   * 删除队伍
   * @param req
   * @param res
   * @param next
   */
  public static async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id;
    await dbSerise
      .delete(id)
      .then(data => {
        debugLog("delete result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "删除赛事",
          "删除赛事，参数》》》" + JSON.stringify(req.body)
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
        "serise/logo/" + files[0].originalname,
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
export default Serise;
