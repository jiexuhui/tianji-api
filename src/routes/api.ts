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
      .post("/seriseDetail", api.seriseDetail);
  }
}

export default new ApiRouter().router;
