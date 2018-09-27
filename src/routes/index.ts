import { Router } from "express";
import msgCode from "../compoents/msgcode";
import apiRouter from "../routes/api";
import articleRouter from "../routes/article";
import bannerRouter from "../routes/banner";
import gameRouter from "../routes/game";
import matchRouter from "../routes/match";
import systemRouter from "../routes/system";
import teamRouter from "../routes/team";

/**
 * 基础路由
 *
 * @class BaseRouter
 */
class BaseRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router.get("/", (req, res, next) => {
      res.json(msgCode.invalidRequest);
    });
    this.router.use("/admin/game", gameRouter);
    this.router.use("/admin", systemRouter);
    this.router.use("/api", apiRouter);
    this.router.use("/admin/banner", bannerRouter);
    this.router.use("/admin/article", articleRouter);
    this.router.use("/admin/team", teamRouter);
    this.router.use("/admin/match", matchRouter);
  }
}

export default new BaseRouter().router;
