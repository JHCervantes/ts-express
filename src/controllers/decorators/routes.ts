import 'reflect-metadata';
import {Methods} from './Methods';
import {MetadataKeys} from './MetadataKeys';
import {RequestHandler} from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeDecorator(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
    };
  };
}

export const GetMapping = routeDecorator(Methods.GET);
export const PutMapping = routeDecorator(Methods.PUT);
export const PostMapping = routeDecorator(Methods.POST);
export const DeleteMapping = routeDecorator(Methods.DELETE);
export const PatchMapping = routeDecorator(Methods.PATCH);
