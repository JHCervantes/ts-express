import 'reflect-metadata';
import {AppRouter} from '../../AppRouter';
import {Methods} from './Methods';
import {MetadataKeys} from './MetadataKeys';
import {NextFunction, Request, RequestHandler, Response} from 'express';

function validations(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid Request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property '${key}'`);
        return;
      }
    }

    next();
  };
}

export function RestController(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.instance;
    for (let key in target.prototype) {
      if (target.prototype.hasOwnProperty(key)) {
        const routeHandler = target.prototype[key];
        const path = Reflect.getMetadata(
          MetadataKeys.PATH,
          target.prototype,
          key
        );
        const method: Methods = Reflect.getMetadata(
          MetadataKeys.METHOD,
          target.prototype,
          key
        );
        const middlewares =
          Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) ||
          [];
        const requiredBodyProps =
          Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) ||
          [];
        const validator = validations(requiredBodyProps);

        if (path) {
          router[method](
            `${routePrefix === '/' ? '' : routePrefix}${path}`,
            ...middlewares,
            validator,
            routeHandler
          );
        }
      }
    }
  };
}
