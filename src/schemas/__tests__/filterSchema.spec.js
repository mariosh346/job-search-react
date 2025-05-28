import { isValidFilter } from '../filterSchema';

export const validFilter = {
  slug: 'filter-slug',
  label_en: 'English Label',
  label_el: 'Greek Label'
};
describe('Filter schema validation', () => {
  it('should validate a correct filter object', () => {
    expect(isValidFilter(validFilter)).toBe(true);
  });
  it('should invalidate if slug is not a string', () => {
    expect(isValidFilter({ ...validFilter, slug: 123 })).toBe(false);
  });
  it('should invalidate if label_en is not a string', () => {
    expect(isValidFilter({ ...validFilter, label_en: 123 })).toBe(false);
  });
  it('should invalidate if label_el is not a string', () => {
    expect(isValidFilter({ ...validFilter, label_el: 123 })).toBe(false);
  });
});




