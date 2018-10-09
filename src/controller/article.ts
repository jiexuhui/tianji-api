import * as debug from "debug";
import { NextFunction, Request, Response } from "express";
import msgCode from "../compoents/msgcode";
const debugLog = debug("api:controller:article");

import co from "co";
import * as fs from "fs";
import ossconfig from "../compoents/oss";
import Tools from "../compoents/tools";
import dbArticle from "../service/article";
import dbSystem from "../service/system";

const OSS = require("ali-oss");
const client = new OSS(ossconfig);

class Banner {
  /**
   * 获取文章列表
   * @param req
   * @param res
   * @param next
   */
  public static async list(req: Request, res: Response, next: NextFunction) {
    const { title = "", page = 1, limit = 20 } = req.body;
    await dbArticle
      .list(title, page, limit)
      .then(data => {
        dbSystem.addoperatelog(
          req.session.user.username,
          "查看文章列表",
          "查看文章列表，参数》》》" + JSON.stringify(req.body)
        );
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }

  /**
   * 添加文章
   * @param req
   * @param res
   * @param next
   */
  public static async add(req: Request, res: Response, next: NextFunction) {
    const {
      title = "",
      date = "",
      author = "",
      content = "",
      status = 0,
      matchid = 0,
      tag = 0
    } = req.body;
    await dbArticle
      .add(title, date, author, content, status, matchid, tag)
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "添加文章",
          "添加文章，参数》》》" + JSON.stringify(req.body)
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
    const {
      id = 0,
      title = "",
      date = "",
      author = "",
      content = "",
      status = 0,
      matchid = 0,
      tag = 0,
      image = ""
    } = req.body;
    await dbArticle
      .edit(id, title, date, author, content, status, matchid, tag, image)
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "编辑文章",
          "编辑文章，参数》》》" + JSON.stringify(req.body)
        );
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }

  /**
   * 文章详情
   * @param req
   * @param res
   * @param next
   */
  public static async detail(req: Request, res: Response, next: NextFunction) {
    const { id = 0 } = req.body;
    await dbArticle
      .detail(id)
      .then(data => {
        debugLog("add result >>>%0", data);
        dbSystem.addoperatelog(
          req.session.user.username,
          "编辑文章",
          "编辑文章，参数》》》" + JSON.stringify(req.body)
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
    await dbArticle
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
   * 上传配图
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
        "game/article/" + files[0].originalname,
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
