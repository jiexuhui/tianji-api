import { Router } from "express";
import game from "../controller/game";

class GameRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router.post("/list", game.list);
  }
}

export default new GameRouter().router;
