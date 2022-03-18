import { Page } from '@/vo/page.vo';

class PageService {
  /**
   * 包装分页信息
   */
  public buildPage(start, limit, totalPage, details): Page {
    return new Page(start, limit, totalPage, details);
  }
}

export default PageService;
