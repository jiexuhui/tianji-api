import * as debug from "debug";
import { NextFunction, Request, Response } from "express";
import msgCode from "../compoents/msgcode";
const debugLog = debug("api:controller:api");

import co from "co";
import * as fs from "fs";
import ossconfig from "../compoents/oss";
import Tools from "../compoents/tools";
import dbSystem from "../service/system";
import dbTeam from "../service/team";

const OSS = require("ali-oss");
const client = new OSS(ossconfig);

class Team {
  /**
   * 获取队伍列表
   * @param req
   * @param res
   * @param next
   */
  public static async list(req: Request, res: Response, next: NextFunction) {
    const {
      id = 0,
      name = "",
      type = 0,
      gameid = 0,
      status = 2,
      page = 1,
      limit = 20
    } = req.body;
    await dbTeam
      .list(id, name, type, gameid, status, page, limit)
      .then(data => {
        dbSystem.addoperatelog(
          req.session.user.username,
          "查看队伍列表",
          "查看队伍列表，参数》》》" + JSON.stringify(req.body)
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
    const { name = "", logo = "", type = 1, gameid = 0, status = 0 } = req.body;
    await dbTeam
      .add(name, logo, type, gameid, status)
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "添加队伍",
          "添加队伍，参数》》》" + JSON.stringify(req.body)
        );
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }

  /**
   * 编辑队伍
   * @param req
   * @param res
   * @param next
   */
  public static async edit(req: Request, res: Response, next: NextFunction) {
    const {
      id = 0,
      name = "",
      logo = "",
      type = 1,
      gameid = 0,
      status = 0
    } = req.body;
    await dbTeam
      .edit(id, name, logo, type, gameid, status)
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "编辑队伍",
          "编辑队伍，参数》》》" + JSON.stringify(req.body)
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
    await dbTeam
      .delete(id)
      .then(data => {
        debugLog("delete result >>>%0", data);
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
        "team/logo/" + files[0].originalname,
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
export default Team;
