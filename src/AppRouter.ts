import {Router} from 'express';

export class AppRouter {
  private static router: Router;

  static get instance(): Router {
    if (!AppRouter.router) {
      AppRouter.router = Router();
    }

    return AppRouter.router;
  }
}
