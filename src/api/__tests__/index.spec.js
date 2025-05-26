import { fetchJobs, fetchFilters } from '../index';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
}));


const fetchJobsFactory = () => {
  const mockJobData = [
    { id: 1, title: 'Software Engineer' },
    { id: 2, title: 'Data Scientist' },
  ];
  axios.get.mockResolvedValue({ data: mockJobData });
  return fetchJobs();
}
const fetchFiltersFactory = () => {
    const mockFilterData = [
      { location: 'New York', category: 'Software Engineering' },
      { location: 'San Francisco', category: 'Data Science' },
    ];
    axios.get.mockResolvedValue({ data: mockFilterData });
  return fetchFilters();
}

describe('API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchJobs should return job data on success', async () => {
    await fetchJobsFactory();

    expect(result).toEqual(mockJobData);
  });
  it('fetchJobs should call axios.get with the correct URL on success', async () => {
    await fetchJobsFactory();
    expect(axios.get).toHaveBeenCalledWith('https://ka-fe-jobboard-assignment-api.azurewebsites.net/jobs');
  });


  it('fetchJobs should throw an error on failure', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching jobs'));

    await expect(fetchJobs()).rejects.toThrow('Error fetching jobs');
  });

  it('fetchFilters should return filter data on success', async () => {
    const result = await fetchFiltersFactory();

    expect(result).toEqual(mockFilterData);
  });
  it('fetchFilters should call axios.get with the correct URL on success', async () => {
    await fetchFiltersFactory();
    expect(axios.get).toHaveBeenCalledWith('https://ka-fe-jobboard-assignment-api.azurewebsites.net/jobs/filters');
  });

  it('fetchFilters should throw an error on failure', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching filters'));

    await expect(fetchFilters()).rejects.toThrow('Error fetching filters');
  });
});
