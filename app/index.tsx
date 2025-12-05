
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MasterBanner } from '../components/MasterBanner';
import { OwnerCard } from '../components/OwnerCard';
import { Colors } from '../constants/Colors';
import { DataService } from '../services/DataService';
import { useAppStore } from '../store/useStore';
import { Owner } from '../types';

type SortOption = 'name' | 'cats';

export default function OwnerListScreen() {
  const router = useRouter();
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const masterId = useAppStore((state) => state.masterId);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await DataService.getOwners();
    setOwners(data);
    setLoading(false);
  };

  const masterOwner = useMemo(() => {
    return owners.find(o => o.id === masterId);
  }, [owners, masterId]);

  const sortedOwners = useMemo(() => {
    const sorted = [...owners];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else {
      sorted.sort((a, b) => b.cats.length - a.cats.length);
    }
    return sorted;
  }, [owners, sortBy]);

  const renderItem = useCallback(({ item }: { item: Owner }) => (
    <OwnerCard
      owner={item}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={toggleFavorite}
      onPress={(id) => router.push(`/owner/${id}`)}
    />
  ), [favorites, toggleFavorite, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {masterOwner && <MasterBanner master={masterOwner} />}
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Owners List</Text>
        <TouchableOpacity 
          style={styles.sortButton} 
          onPress={() => setSortBy(prev => prev === 'name' ? 'cats' : 'name')}
        >
          <Text style={styles.sortText}>Sort By: {sortBy === 'name' ? 'Name' : 'Cats'}</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={sortedOwners}
          renderItem={renderItem}
          // estimatedItemSize={85}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary, // Using primary color for "Owners List" label based on design hint (light blue/purple)
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 4,
  },
  listContainer: {
    flex: 1,
  },
});
