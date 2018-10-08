import { Router } from "express";
import team from "../controller/team";

class TeamRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router
      .post("/list", team.list)
      .post("/add", team.add)
      .post("/edit", team.edit)
      .post("/delete", team.delete)
      .post("/upload", team.upload)
      .post("/uploadPic", team.uploadPic);
  }
}

export default new TeamRouter().router;
