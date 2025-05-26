import { isValidJob } from '../jobSchema';

const validJob = {
  id: 1,
  slug: 'software-engineer',
  title: 'Software Engineer',
  company: 'Acme Corp',
  location: 'New York',
  category: 'Engineering',
  tags: ['javascript', 'react'],
  description: 'Job description',
  postedAt: '2024-06-01T00:00:00Z'
};

describe('Job schema validation', () => {
  it('should validate a correct job object', () => {
    expect(isValidJob(validJob)).toBe(true);
  });

  it('should invalidate if id is not a number', () => {
    expect(isValidJob({ ...validJob, id: '1' })).toBe(false);
  });

  it('should invalidate if slug is not a string', () => {
    expect(isValidJob({ ...validJob, slug: 123 })).toBe(false);
  });

  it('should invalidate if title is not a string', () => {
    expect(isValidJob({ ...validJob, title: 123 })).toBe(false);
  });

  it('should invalidate if company is not a string', () => {
    expect(isValidJob({ ...validJob, company: 123 })).toBe(false);
  });

  it('should invalidate if location is not a string', () => {
    expect(isValidJob({ ...validJob, location: 123 })).toBe(false);
  });

  it('should invalidate if category is not a string', () => {
    expect(isValidJob({ ...validJob, category: 123 })).toBe(false);
  });

  it('should invalidate if tags is not an array', () => {
    expect(isValidJob({ ...validJob, tags: 'not-an-array' })).toBe(false);
  });

  it('should invalidate if tags contains non-string', () => {
    expect(isValidJob({ ...validJob, tags: ['javascript', 123] })).toBe(false);
  });

  it('should invalidate if description is not a string', () => {
    expect(isValidJob({ ...validJob, description: 123 })).toBe(false);
  });

  it('should invalidate if postedAt is not a string', () => {
    expect(isValidJob({ ...validJob, postedAt: 123 })).toBe(false);
  });
});
