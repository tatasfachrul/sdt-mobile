import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CatCard } from '../../components/CatCard';
import { Colors } from '../../constants/Colors';
import { useShake } from '../../hooks/useShake';
import { DataService } from '../../services/DataService';
import { useAppStore } from '../../store/useStore';
import { Owner } from '../../types';

export default function OwnerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [owner, setOwner] = useState<Owner | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const setMaster = useAppStore((state) => state.setMaster);
  const masterId = useAppStore((state) => state.masterId);

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]);

  const loadData = async (ownerId: string) => {
    setLoading(true);
    const data = await DataService.getOwnerById(ownerId);
    setOwner(data);
    setLoading(false);
  };

  const handleMakeMaster = () => {
    if (owner) {
      setMaster(owner.id);
      Alert.alert('Success', `${owner.firstName} is now the Master!`);
    }
  };

  useShake(() => {
    handleMakeMaster();
  });

  if (loading || !owner) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const isFavorite = favorites.includes(owner.id);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
             <View style={styles.headerRight}>
                {masterId === owner.id && (
                    <Text style={styles.masterText}>Master: {owner.firstName} {owner.lastName}</Text>
                )}
                {/* Avatar could go here if needed to match design exactly */}
             </View>
          )
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerSpacer} />
        
        {/* Header Area matching design */}
        <View style={styles.topHeader}>
             <View style={styles.avatarSmall}>
                <Text style={styles.avatarTextSmall}>{owner.firstName[0]}{owner.lastName[0]}</Text>
             </View>
             <Text style={styles.topHeaderText}>Master: {masterId === owner.id ? `${owner.firstName} ${owner.lastName}` : 'None'}</Text>
        </View>

        <Text style={styles.sectionTitle}>Owner Card</Text>
        <View style={styles.ownerCard}>
          <View style={styles.ownerAvatar}>
             <Text style={styles.ownerAvatarText}>{owner.firstName[0]}{owner.lastName[0]}</Text>
          </View>
          <View style={styles.ownerInfo}>
             <Text style={styles.label}>First Name</Text>
             <Text style={styles.value}>{owner.firstName}</Text>
             <Text style={styles.label}>Last Name</Text>
             <Text style={styles.value}>{owner.lastName}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(owner.id)}>
            <Ionicons
              name={isFavorite ? 'star' : 'star-outline'}
              size={28}
              color={isFavorite ? Colors.favorite : Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Cats</Text>
        {owner.cats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleMakeMaster}>
          <Text style={styles.buttonText}>Make Master</Text>
        </TouchableOpacity>
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
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  headerSpacer: {
    height: 60,
  },
  backButton: {
    marginLeft: 16,
  },
  headerRight: {
      marginRight: 16,
  },
  masterText: {
      fontSize: 14,
      fontWeight: '600',
  },
  topHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
  },
  avatarSmall: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: Colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
  },
  avatarTextSmall: {
      color: Colors.secondary,
      fontWeight: 'bold',
  },
  topHeaderText: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors.text,
  },
  sectionTitle: {
    fontSize: 16,
    color: Colors.primary, // Light blue/purple color
    marginBottom: 12,
    marginTop: 12,
  },
  ownerCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  ownerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  ownerAvatarText: {
    fontSize: 24,
    color: Colors.surface,
    fontWeight: 'bold',
  },
  ownerInfo: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: Colors.primary, // Light blue/purple
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
    marginBottom: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: Colors.background, // Or transparent with blur
  },
  button: {
    backgroundColor: Colors.secondary, // Teal/Green
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: '600',
  },
});
