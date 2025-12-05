import { generateMockData } from '../utils/mockData';

describe('generateMockData', () => {
  it('should generate correct number of owners', () => {
    const owners = generateMockData(10);
    expect(owners).toHaveLength(10);
  });

  it('should generate owners with required properties', () => {
    const owners = generateMockData(1);
    const owner = owners[0];
    
    expect(owner).toHaveProperty('id');
    expect(owner).toHaveProperty('firstName');
    expect(owner).toHaveProperty('lastName');
    expect(owner).toHaveProperty('cats');
    expect(Array.isArray(owner.cats)).toBe(true);
  });
});
