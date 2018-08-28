import { Router } from "express";
import game from "../controller/game";

class GameRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router
      .post("/list", game.list)
      .post("/add", game.add)
      .post("/edit", game.edit)
      .post("/delete", game.delete)
      .post("/upload", game.upload);
  }
}

export default new GameRouter().router;
