import React, { useEffect } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import log from '../../../config/helpers/ConfigLogger';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';

export const HomeScreen = ({ route, navigation }: any) => {

  const isFocused = useIsFocused();
  const { width, height } = useWindowDimensions();

  useEffect(() => {

  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{}}>
        <Text>Home</Text>
      </View>
    </View>
  )
}


