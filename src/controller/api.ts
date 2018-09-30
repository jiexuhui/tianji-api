import axios from "axios";
import * as debug from "debug";
import { NextFunction, Request, Response } from "express";
import msgCode from "../compoents/msgcode";

const debugLog = debug("api:controller:api");
import wechatconfig from "../configs/common/wechat";

import Tools from "../compoents/tools";
import dbApi from "../service/api";

// 小程序相关API
class Api {
  /**
   * 微信小程序登录接口
   * @param req
   * @param res
   * @param next
   */
  public static async loginByWeixin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const params = req.body;
    wechatconfig.js_code = params.code;
    const userinfo = params.userInfo.userInfo;
    const resdata = {};
    debugLog("wechatconfig:%o", JSON.stringify(wechatconfig));
    const url = "https://api.weixin.qq.com/sns/jscode2session";
    const result = await axios.get(url, { params: wechatconfig }).then();
    debugLog("result:%o", result);
    Object.assign(userinfo, { openid: result.data.openid });
    debugLog("userinfo:%o", userinfo);
    const isnew = await dbApi.saveuserinfo(userinfo);
    Object.assign(resdata, {
      userinfo,
      token: result.data.session_key
    });

    msgCode.success.data = resdata || [];
    res.json(msgCode.success);
    return;
  }

  /**
   * 获取首页活动列表
   * @param req
   * @param res
   * @param next
   */
  public static async getActivityInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await dbApi
      .getActivityInfo(req.body.openid)
      .then(data => res.json(Tools.handleResult(data)));
  }

  /**
   * 获取首页活动列表
   * @param req
   * @param res
   * @param next
   */
  public static async selectTeam(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await dbApi
      .selectTeam(req.body.matchid, req.body.openid, req.body.teamid)
      .then(data => res.json(Tools.handleResult(data)));
  }

  /**
   * 赛事列表
   * @param req
   * @param res
   * @param next
   */
  public static async matchList(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await dbApi
      .matchList(req.body.gametype)
      .then(data => res.json(Tools.handleResult(data)))
      .catch(err => next(err));
  }

  /**
   * 赛事相关文章列表
   * @param req
   * @param res
   * @param next
   */
  public static async getMatchArticles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await dbApi
      .getMatchArticles(req.body.matchid)
      .then(data => res.json(Tools.handleResult(data)))
      .catch(err => next(err));
  }

  /**
   * 获取首页BANNER
   * @param req
   * @param res
   * @param next
   */
  public static async getBanners(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await dbApi
      .getBanners()
      .then(data => res.json(Tools.handleResult(data)))
      .catch(err => next(err));
  }

  /**
   * 获取文章详情
   * @param req
   * @param res
   * @param next
   */
  public static async getArticleDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await dbApi
      .getArticleDetail(req.body.articleid)
      .then(data => res.json(Tools.handleResult(data)))
      .catch(err => next(err));
  }

  /**
   * 天机实时对话
   * @param req
   * @param res
   * @param next
   */
  public static async addChatLog(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { content = "" } = req.body;
    await dbApi
      .addChatLog(
        req.body.openid,
        new Buffer(content).toString("base64"),
        req.body.matchid
      )
      .then(data => {
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }

  /**
   * 获取实时对话列表
   * @param req
   * @param res
   * @param next
   */
  public static async getChatLogs(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await dbApi
      .getChatLogs(req.body.openid, req.body.matchid)
      .then(data => {
        data[0].forEach(item => {
          item.content = new Buffer(item.content, "base64").toString();
        });
        res.json(Tools.handleResult(data));
      })
      .catch(err => next(err));
  }

  /**
   * 获取赛事列表
   * @param req
   * @param res
   * @param next
   */
  public static async seriseList(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await dbApi
      .seriseList()
      .then(data => res.json(Tools.handleResult(data)))
      .catch(err => next(err));
  }

  /**
   * 获取赛事详情
   * @param req
   * @param res
   * @param next
   */
  public static async seriseDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await dbApi
      .seriseDetail(req.body.seriseid)
      .then(data => res.json(Tools.handleResult(data)))
      .catch(err => next(err));
  }
}
export default Api;
