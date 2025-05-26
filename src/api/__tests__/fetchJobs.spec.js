import { fetchJobs } from '../fetchJobs';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

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

describe('fetchJobs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(' should return job data on success', async () => {
    const result = await fetchJobsFactory();

    expect(result).toEqual(mockJobData);
  });
  it(' should call axios.get with the correct URL and params on success', async () => {
    await fetchJobsFactory();
    expect(axios.get).toHaveBeenCalledWith(
      'https://ka-fe-jobboard-assignment-api.azurewebsites.net/jobs',
      fetchJobsParams
    );
  });
  it('with wrong param, should call axios.get with only the correct params', async () => {
    await fetchJobsFactory({ ...fetchJobsParams, wrong: 'data' });
    expect(axios.get).toHaveBeenCalledWith(
      'https://ka-fe-jobboard-assignment-api.azurewebsites.net/jobs',
      fetchJobsParams
    );
  });

  it('should throw an error on failure', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching jobs'));

    await expect(fetchJobs()).rejects.toBeDefined();;
  });

  it('should reject if page is not a number', async () => {
    await expect(fetchJobs({ ...fetchJobsParams, page: 'one' })).rejects.toBeDefined();
  });

  it('should reject if pageSize is not a number', async () => {
    await expect(fetchJobs({ ...fetchJobsParams, pageSize: 'ten' })).rejects.toBeDefined();
  });

  it('should reject if lang is not a string', async () => {
    await expect(fetchJobs({ ...fetchJobsParams, lang: 123 })).rejects.toBeDefined();
  });

  it('should reject if location is not a string', async () => {
    await expect(fetchJobs({ ...fetchJobsParams, location: 456 })).rejects.toBeDefined();
  });

  it('should reject if category is not a string', async () => {
    await expect(fetchJobs({ ...fetchJobsParams, category: 789 })).rejects.toBeDefined();
  });
  it('should reject if returned jobs are not valid', async () => {
    isValidJobs.mockReturnValue(false);
    await expect(fetchJobs()).rejects.toBeDefined();
  });
});
