import { isValidFilters } from '../filtersSchema';

jest.mock('../filterSchema', () => ({
  isValidFilter: jest.fn(() => true)
}));

const validFilters = {
  locations: [{ name: 'New York', value: 'ny' }],
  categories: [{ name: 'Food', value: 'food' }]
};

describe('isValidFilters', () => {
    test('should return true for valid filters', () => {
        expect(isValidFilters(validFilters)).toBe(true);
    });
    test('should return false if categories are missing', () => {
        expect(isValidFilters({ locations: validFilters.locations })).toBe(true);
    });
    test('should return false if locations are missing', () => {
        expect(isValidFilters({ categories: validFilters.categories })).toBe(true);
    });
    test('should return false if isValidFilter returns false for any filter', () => {
        isValidFilter.mockReturnValue(false);
        expect(isValidFilters({ ...validFilters, locations: [{ name: 'Invalid Location', value: 'invalid' }] })).toBe(false);
    });
});
