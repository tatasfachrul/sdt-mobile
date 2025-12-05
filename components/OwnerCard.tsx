import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Owner } from '../types';

interface OwnerCardProps {
  owner: Owner;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPress: (id: string) => void;
}

export const OwnerCard = memo(({ owner, isFavorite, onToggleFavorite, onPress }: OwnerCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(owner.id)} activeOpacity={0.7}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {owner.firstName[0]}{owner.lastName[0]}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{owner.firstName} {owner.lastName}</Text>
      </View>
      <TouchableOpacity onPress={() => onToggleFavorite(owner.id)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons
          name={isFavorite ? 'star' : 'star-outline'}
          size={24}
          color={isFavorite ? Colors.favorite : Colors.textSecondary}
        />
      </TouchableOpacity>
      <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} style={styles.chevron} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  chevron: {
    marginLeft: 8,
  },
});
