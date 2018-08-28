import { Router } from "express";
import banner from "../controller/banner";

class BannerRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router
      .post("/list", banner.list)
      .post("/add", banner.add)
      .post("/edit", banner.edit)
      .post("/delete", banner.delete)
      .post("/upload", banner.upload);
  }
}

export default new BannerRouter().router;
