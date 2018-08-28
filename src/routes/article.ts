import { Router } from "express";
import article from "../controller/article";

class BannerRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router
      .post("/list", article.list)
      .post("/add", article.add)
      .post("/edit", article.edit)
      .post("/delete", article.delete);
  }
}

export default new BannerRouter().router;
