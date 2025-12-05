import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

const THRESHOLD = 1.78;

export const useShake = (onShake: () => void) => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    const { x, y, z } = data;
    const acceleration = Math.sqrt(x * x + y * y + z * z);
    if (acceleration >= THRESHOLD) {
      onShake();
    }
  }, [data]);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
    Accelerometer.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };
};
