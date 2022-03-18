import { Result } from '@/vo/result.vo';

class ResultService {
  /**
   * 成功返回结果
   */
  public toSuccess(data) {
    const result = { code: 0, message: 'success', data: data };
    // console.log(result);
    return result;
  }
}

export default ResultService;
