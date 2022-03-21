import { Result } from '@/vo/result.vo';

class ResultService {
  /**
   * 成功返回结果
   */
  public toSuccess(data): Result {
    return new Result(0, 'success', data);
  }
}

export default ResultService;
