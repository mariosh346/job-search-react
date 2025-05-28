import { fetchJobs } from '../fetchJobs';
import { isValidJobs } from '@/schemas/jobsSchema'
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
}));
jest.mock('@/schemas/jobsSchema');

const fetchJobsParams = {
  lang: 'en', location: 'New York',
  category: 'Software Engineering', category: 'Data Science', page: 1,
  pageSize: 10
};
const mockJobData = [
  { id: 1, title: 'Software Engineer' },
  { id: 2, title: 'Data Scientist' },
];
const fetchJobsFactory = (params = fetchJobsParams) => {
  axios.get.mockResolvedValue({ data: mockJobData });
  return fetchJobs(params);
};

describe('fetchJobsFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    isValidJobs.mockReturnValue(true)
  });

  it(' should return job data on success', async () => {
    const result = await fetchJobsFactory();

    expect(result).toEqual(mockJobData);
  });
  it(' should call axios.get with the correct URL and params on success', async () => {
    await fetchJobsFactory();
    expect(axios.get).toHaveBeenCalledWith(
      'https://ka-fe-jobboard-assignment-api.azurewebsites.net/jobs',
      { params: fetchJobsParams }
    );
  });
  it('with wrong param, should throw an error', async () => {
    expect.assertions(1);
    await expect(
      fetchJobsFactory({ ...fetchJobsParams, wrong: 'data' })
    ).rejects.toBeDefined();
  });

  it('should throw an error on failure', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching jobs'));
    expect.assertions(1);
    await expect(fetchJobs(fetchJobsParams)).rejects.toBeDefined();;
  });

  it('should reject if page is not a number', async () => {
    expect.assertions(1);
    await expect(fetchJobsFactory({ ...fetchJobsParams, page: 'one' })).rejects.toBeDefined();
  });

  it('should reject if pageSize is not a number', async () => {
    expect.assertions(1);
    await expect(fetchJobsFactory({ ...fetchJobsParams, pageSize: 'ten' })).rejects.toBeDefined();
  });

  it('should reject if lang is not a string', async () => {
    expect.assertions(1);
    await expect(fetchJobsFactory({ ...fetchJobsParams, lang: 123 })).rejects.toBeDefined();
  });

  it('should reject if location is not a string', async () => {
    expect.assertions(1);
    await expect(fetchJobsFactory({ ...fetchJobsParams, location: 456 })).rejects.toBeDefined();
  });

  it('should reject if category is not a string', async () => {
    expect.assertions(1);
    await expect(fetchJobsFactory({ ...fetchJobsParams, category: 789 })).rejects.toThrow();
  });
  it('should reject if returned jobs are not valid', async () => {
    expect.assertions(1);
    isValidJobs.mockReturnValue(false);
    await expect(fetchJobsFactory()).rejects.toBeDefined();
  });
});
