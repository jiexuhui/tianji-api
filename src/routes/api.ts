import { Router } from "express";
import api from "../controller/api";

/**
 * 与服务端交互
 *
 * @class UserRouter
 */
class ApiRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router
      .post("/loginByWeixin", api.loginByWeixin)
      .post("/getActivityInfo", api.getActivityInfo)
      .post("/selectTeam", api.selectTeam)
      .post("/matchList", api.matchList)
      .post("/getMatchArticle", api.getMatchArticles)
      .post("/getBanners", api.getBanners)
      .post("/getArticleDetail", api.getArticleDetail)
      .post("/getChatLogs", api.getChatLogs)
      .post("/addChatLog", api.addChatLog)
      .post("/seriseList", api.seriseList)
      .post("/seriseDetail", api.seriseDetail)
      .post("/guessings", api.guessings)
      .post("/answerGuessing", api.answerGuessing)
      .post("/wechatInfo", api.wechatInfo)
      .post("/applyGod", api.applyGod)
      .post("/pushCases", api.pushCases)
      .post("/addCase", api.addCase)
      .post("/caseIndex", api.caseIndex)
      .post("/userInfo", api.userInfo)
      .post("/myFollows", api.myFollows)
      .post("/buySilkLogs", api.buySilkLogs)
      .post("/putForward", api.putForward);
  }
}

export default new ApiRouter().router;
