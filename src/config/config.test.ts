import config from './config';
import _ from 'lodash';

describe('test config file', () => {
  describe('should get config file', () => {
    const expectHasValue = (v: any, k: any) => {
      if (_.isObject(v)) {
        _.each(v, (v: any, k: any) => expectHasValue(v, k));
      } else {
        it(`should get config value with key: ${k}`, () => expect(v).toEqual(expect.anything()));
      }
    };
    _.each(config, (v: any, k: any) => expectHasValue(v, k));
  });
});
