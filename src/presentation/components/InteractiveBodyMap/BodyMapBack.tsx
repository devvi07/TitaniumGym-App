import React, { useState } from 'react';
import { View, Alert, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BodyMapBack = ({ size = 300 }) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handlePress = (zone: string) => {
    setSelectedZone(zone);
    Alert.alert(`Zona seleccionada: ${zone}`);
  };

  const getFill = (zone: string, defaultColor: string) =>
    selectedZone === zone ? '#FF4081' : defaultColor;

  return (
    <SafeAreaView>
          <View><Text>jjj</Text></View>
        </SafeAreaView>
  );
};

export default BodyMapBack;
