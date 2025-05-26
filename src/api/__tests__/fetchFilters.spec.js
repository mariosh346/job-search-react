import { fetchFilters } from '../index';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

const mockFilterData = [
  { location: 'New York', category: 'Software Engineering' },
  { location: 'San Francisco', category: 'Data Science' },
];
const fetchFiltersFactory = () => {
  axios.get.mockResolvedValue({ data: mockFilterData });
  return fetchFilters();
};

describe('fetchFilters', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return filter data on success', async () => {
    const result = await fetchFiltersFactory();

    expect(result).toEqual(mockFilterData);
  });
  it('should call axios.get with the correct URL on success', async () => {
    await fetchFiltersFactory();
    expect(axios.get).toHaveBeenCalledWith('https://ka-fe-jobboard-assignment-api.azurewebsites.net/jobs/filters');
  });

  it('should throw an error on failure', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching filters'));

    await expect(fetchFilters()).rejects.toThrow('Error fetching filters');
  });
  it('should reject if filters are not valid', () => {
    isValidFilters.mockReturnValue(false);
    await expect(fetchFilters()).rejects.toBeDefined();
  }
});
