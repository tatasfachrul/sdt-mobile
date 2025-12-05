import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Owner } from '../types';

interface MasterBannerProps {
  master: Owner;
}

export const MasterBanner = ({ master }: MasterBannerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {master.firstName[0]}{master.lastName[0]}
        </Text>
      </View>
      <Text style={styles.text}>Master: {master.firstName} {master.lastName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.surface, // Or transparent if background handles it
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.master,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.master,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
});
