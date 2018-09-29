import { Router } from "express";
import serise from "../controller/serise";

class TeamRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router
      .post("/list", serise.list)
      .post("/add", serise.add)
      .post("/edit", serise.edit)
      .post("/delete", serise.delete)
      .post("/upload", serise.upload);
  }
}

export default new TeamRouter().router;
