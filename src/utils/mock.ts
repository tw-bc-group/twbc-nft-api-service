/**
 * @method mock
 * @returns {JSON} true & false
 * @description read data from json file
 * @param path
 */
export const mock = (path: string): JSON => {
  return require(path);
};
