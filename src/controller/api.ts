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
    Object.assign(userinfo, { openid: result.data.openid });
    // const isnew = await dbApi.isNewanchor(userinfo);
    // debugLog("isnew:%o", isnew[1][0]);
    // Object.assign(userinfo, { isnew: isnew[0][0].isNew });
    // debugLog("userinfo1:%o", userinfo);
    // if (isnew[0][0].isNew === 0) {
    //   Object.assign(userinfo, isnew[1][0]);
    // }
    debugLog("userinfo:%o", userinfo);
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
}
export default Api;
