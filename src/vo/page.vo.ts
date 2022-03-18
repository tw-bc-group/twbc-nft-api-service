export class Page {
  constructor(start, limit, totalPage, details) {
    this.start = start;
    this.limit = limit;
    this.totalPage = totalPage;
    this.details = details;
  }

  start: number;
  limit: number;
  totalPage: number;
  details: [{}];
}
