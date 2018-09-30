import * as debug from "debug";
import { NextFunction, Request, Response } from "express";
import msgCode from "../compoents/msgcode";
const debugLog = debug("api:controller:api");

import co from "co";
import * as fs from "fs";
import ossconfig from "../compoents/oss";
import Tools from "../compoents/tools";
import dbMatch from "../service/match";
import dbSystem from "../service/system";

const OSS = require("ali-oss");
const client = new OSS(ossconfig);

class Match {
  /**
   * 获取比赛列表
   * @param req
   * @param res
   * @param next
   */
  public static async list(req: Request, res: Response, next: NextFunction) {
    const {
      id = 0,
      name = "",
      status = 0,
      page = 1,
      limit = 20,
      seriseid = 0
    } = req.body;
    await dbMatch
      .list(
        id === "" ? 0 : id,
        name,
        status === "" ? 0 : status,
        page,
        limit,
        seriseid === "" ? 0 : seriseid
      )
      .then(data => {
        dbSystem.addoperatelog(
          req.session.user.username,
          "查看比赛列表",
          "查看比赛列表，参数》》》" + JSON.stringify(req.body)
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
      status = 0,
      sort = 0,
      stime = "",
      etime = "",
      leftteam = 0,
      leftscore = 0,
      rightteam = 0,
      rightscore = 0,
      many = 1,
      whitch = 1,
      seriseid,
      ltower = 0,
      rtower = 0,
      lmoney = 0,
      rmoney = 0,
      ldragon = 0,
      rdragon = 0,
      lkill = 0,
      rkill = 0
    } = req.body;
    await dbMatch
      .add(
        name,
        desc,
        teams,
        gameid === "" ? 0 : gameid,
        status === "" ? 0 : status,
        sort,
        stime,
        etime,
        leftteam,
        leftscore,
        rightteam,
        rightscore,
        many,
        whitch,
        seriseid,
        ltower,
        rtower,
        lmoney,
        rmoney,
        ldragon,
        rdragon,
        lkill,
        rkill
      )
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "添加比赛",
          "添加比赛，参数》》》" + JSON.stringify(req.body)
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
      desc = "",
      teams = "",
      gameid = 0,
      status = 0,
      sort = 0,
      stime = "",
      etime = "",
      leftteam = 0,
      leftscore = 0,
      rightteam = 0,
      rightscore = 0,
      many = 1,
      whitch = 1,
      seriseid = 0,
      ltower = 0,
      rtower = 0,
      lmoney = 0,
      rmoney = 0,
      ldragon = 0,
      rdragon = 0,
      lkill = 0,
      rkill = 0
    } = req.body;
    await dbMatch
      .edit(
        id,
        name,
        desc,
        teams,
        gameid,
        status,
        sort,
        stime,
        etime,
        leftteam,
        leftscore,
        rightteam,
        rightscore,
        many,
        whitch,
        seriseid,
        ltower,
        rtower,
        lmoney,
        rmoney,
        ldragon,
        rdragon,
        lkill,
        rkill
      )
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "编辑比赛",
          "编辑比赛，参数》》》" + JSON.stringify(req.body)
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
    await dbMatch
      .delete(id)
      .then(data => {
        debugLog("delete result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "删除比赛",
          "删除比赛，参数》》》" + JSON.stringify(req.body)
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
export default Match;
