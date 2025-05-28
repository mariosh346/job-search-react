import { isValidJobs } from '../jobsSchema';
import { validJob } from './jobSchema.spec';

const validJobsResponse = {
  results: [validJob],
  total: 1,
  page: 1,
  pageSize: 10
};

describe('Jobs response schema validation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate a correct jobs response object', () => {
    expect(isValidJobs(validJobsResponse)).toBe(true);
  });

  it('should invalidate if results is not an array', () => {
    expect(isValidJobs({ ...validJobsResponse, results: 'not-an-array' })).toBe(false);
  });

  it('should invalidate if results contains invalid job', () => {
    const invalidResults = [{ id: 2, title: 'Invalid' }];
    expect(isValidJobs({ ...validJobsResponse, results: invalidResults })).toBe(false);
  });

  it('should invalidate if total is not a number', () => {
    expect(isValidJobs({ ...validJobsResponse, total: '1' })).toBe(false);
  });

  it('should invalidate if page is not a number', () => {
    expect(isValidJobs({ ...validJobsResponse, page: '1' })).toBe(false);
  });

  it('should invalidate if pageSize is not a number', () => {
    expect(isValidJobs({ ...validJobsResponse, pageSize: '10' })).toBe(false);
  });
});
