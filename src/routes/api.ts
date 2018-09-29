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
      .post("/getBanners", api.getBanners);
  }
}

export default new ApiRouter().router;
