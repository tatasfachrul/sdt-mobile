import { useAppStore } from '../store/useStore';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({ favorites: [], masterId: null, masterData: null });
  });

  it('should toggle favorite', () => {
    const { toggleFavorite } = useAppStore.getState();
    
    toggleFavorite('1');
    expect(useAppStore.getState().favorites).toContain('1');
    
    toggleFavorite('1');
    expect(useAppStore.getState().favorites).not.toContain('1');
  });

  it('should set master id', () => {
    const { setMasterId } = useAppStore.getState();
    
    setMasterId('1');
    expect(useAppStore.getState().masterId).toBe('1');
    
    setMasterId('2');
    expect(useAppStore.getState().masterId).toBe('2');
  });

  it('should set master data', () => {
    const { setMasterData } = useAppStore.getState();
    const mockOwner = { id: '1', firstName: 'John', lastName: 'Doe', cats: [] };
    
    setMasterData(mockOwner);
    expect(useAppStore.getState().masterData).toEqual(mockOwner);
  });
});
