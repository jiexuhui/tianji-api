import { Router } from "express";
import guessing from "../controller/guessing";

class BannerRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router
      .post("/list", guessing.list)
      .post("/add", guessing.add)
      .post("/edit", guessing.edit)
      .post("/delete", guessing.delete)
      .post("/upload", guessing.upload);
  }
}

export default new BannerRouter().router;
