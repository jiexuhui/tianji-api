import { Router } from "express";
import match from "../controller/match";

class TeamRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router
      .post("/list", match.list)
      .post("/add", match.add)
      .post("/edit", match.edit)
      .post("/delete", match.delete)
      .post("/upload", match.upload);
  }
}

export default new TeamRouter().router;
