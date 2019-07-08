import 'reflect-metadata';
import {MetadataKeys} from './MetadataKeys';

export function RequestBodyValidator(...keys: string[]) {
  return function (target: any, key: string) {
    Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key);
  };
}
