import { Owner } from '../types';
import { generateMockData } from '../utils/mockData';

let cachedOwners: Owner[] | null = null;

export const DataService = {
  getOwners: async (): Promise<Owner[]> => {
    if (cachedOwners) {
      return cachedOwners;
    }
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));
    cachedOwners = generateMockData(10);
    return cachedOwners;
  },
  
  getOwnerById: async (id: string): Promise<Owner | undefined> => {
    if (!cachedOwners) {
      await DataService.getOwners();
    }
    return cachedOwners?.find(o => o.id === id);
  }
};
