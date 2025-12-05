import { Texts } from '@/constants/Texts';
import { Owner } from '@/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

import { StyleProp, ViewStyle } from 'react-native';

interface MasterBannerProps {
  master: Owner;
  style?: StyleProp<ViewStyle>;
}

export const MasterBanner = ({ master, style }: MasterBannerProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatar}>
        <Text style={{ ...Texts.Typography.Avatar, color: Colors.master }}>
          {master.firstName[0]}{master.lastName[0]}
        </Text>
      </View>
      <Text style={Texts.Typography.Title}>Master: {master.firstName} {master.lastName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 24,
    padding: 16,
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
    backgroundColor: Colors.surface,
  },
});
