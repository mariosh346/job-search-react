import { isValidFilters } from '../filtersSchema';
import { validFilter } from './filterSchema.spec';

const validFilters = {
    locations: [validFilter],
    categories: [validFilter]
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
    test('should return false if locations filter is invalid', () => {
        expect(isValidFilters({ ...validFilters, locations: [{ name: 'Invalid Location', value: 'invalid' }] })).toBe(false);
    });
    test('should return false if categories filter is invalid', () => {
        expect(isValidFilters({ ...validFilters, categories: [{ name: 'Invalid category', value: 'invalid' }] })).toBe(false);
    });
});
