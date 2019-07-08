import 'reflect-metadata';
import {RequestHandler} from 'express';
import {MetadataKeys} from './MetadataKeys';

export function Use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || [];

    Reflect.defineMetadata(
      MetadataKeys.MIDDLEWARE,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
