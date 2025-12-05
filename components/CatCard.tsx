import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Cat } from '../types';

interface CatCardProps {
  cat: Cat;
}

export const CatCard = memo(({ cat }: CatCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{cat.name}</Text>
        <Text style={styles.age}>Age: {cat.ageYears} years {cat.ageMonths} months</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  age: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
