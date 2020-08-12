/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-this-alias */
const Path = require('path');

const pathResolve = path => paths => Path.resolve(path, ...paths);
const pathJoin = path => paths => Path.join(path, ...paths);

const pathJoinDir = pathJoin(__dirname);
const pathResolveDir = pathResolve(__dirname);

const config = {
  srcPath: pathResolveDir(['../src/']),
  buildPath: pathJoinDir(['../dist/']),
  public: 'public',
};

module.exports = config;
