import { useAppStore } from '../store/useStore';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({ favorites: [], masterId: null });
  });

  it('should toggle favorite', () => {
    const { toggleFavorite } = useAppStore.getState();
    
    toggleFavorite('1');
    expect(useAppStore.getState().favorites).toContain('1');
    
    toggleFavorite('1');
    expect(useAppStore.getState().favorites).not.toContain('1');
  });

  it('should set master', () => {
    const { setMaster } = useAppStore.getState();
    
    setMaster('1');
    expect(useAppStore.getState().masterId).toBe('1');
    
    setMaster('2');
    expect(useAppStore.getState().masterId).toBe('2');
  });
});
