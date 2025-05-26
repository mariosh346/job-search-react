import { isValidJobs } from '../jobsSchema';
import { isValidJob } from '../jobSchema';

jest.mock('../jobSchema', () => ({
  isValidJob: jest.fn(() => true)
}));

const validJobsResponse = {
  results: [{}],
  total: 1,
  page: 1,
  pageSize: 10
};

describe('Jobs response schema validation', () => {
  it('should validate a correct jobs response object', () => {
    expect(isValidJobs(validJobsResponse)).toBe(true);
  });

  it('should invalidate if isValidJob returns false', () => {
    isValidJob.mockReturnValue(false);
    expect(isValidJobs({ ...validJobsResponse, results: 'not-an-array' })).toBe(false);
  });

  it('should invalidate if results contains invalid job', () => {
    const invalidResults = [{ ...validJob, id: '1' }];
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
