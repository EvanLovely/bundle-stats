import {
  array,
  boolean,
  intersection,
  number,
  object,
  optional,
  string,
  struct,
  union,
} from 'superstruct';

const NotEmptyArray = struct('NotEmptyArray', (value) => Array.isArray(value) && value?.length > 0);

export const WebpackSourceAssetStruct = object({
  name: string(),
  size: number(),
});

export const WebpackSourceModuleChunk = object({
  name: string(),
  size: number(),
  chunks: array(union([number(), string()])),
});

export const WebpackSourceChunkStruct = object({
  id: union([number(), string()]),
  entry: boolean(),
  initial: boolean(),
  names: array(string()),
  files: array(string()),
});

export const WebpackSourceStruct = object({
  hash: optional(string()),
  builtAt: optional(number()),
  assets: intersection([array(WebpackSourceAssetStruct), NotEmptyArray]),
  modules: optional(array(WebpackSourceModuleChunk)),
  chunks: optional(array(WebpackSourceChunkStruct)),
});
