import { Router } from "express";
import system from "../controller/system";

/**
 * 后台总体设置路由
 *
 * @class SystemRouter
 */
class SystemRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router
      .post("/system/login", system.login)
      .get("/system/userinfo", system.userinfo)
      .post("/system/logout", system.logout)
      .post("/system/loginlogslist", system.loginLogsList)
      .post("/system/usermenu", system.userMenu)
      .get("/roles/roles", system.roles)
      .post("/roles/delrole", system.delRole)
      .post("/roles/addrole", system.addRole)
      .post("/roles/editrole", system.editRole)
      .get("/users/users", system.users)
      .post("/users/addsystemuser", system.addSystemUser)
      .post("/users/editsystemuser", system.editSystemUser)
      .post("/system/operatelogs", system.operatelogs)
      .post("/menus/menus", system.menus)
      .post("/menus/addmenu", system.addmenu)
      .post("/menus/editmenu", system.editmenu)
      .post("/menus/delmenu", system.delmenu)
      .post("/menus/defaultcheck", system.defaultcheck)
      .post("/roles/userpermission", system.userpermission)
      .post("/system/loginlogs", system.loginlogs);
  }
}

export default new SystemRouter().router;
