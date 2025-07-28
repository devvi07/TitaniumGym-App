import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';

const InteractiveBodyMap = () => {

  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handlePress = (zone: string) => {
    setSelectedZone(zone);
    Alert.alert(`Zona seleccionada: ${zone}`);
  };

  const getFill = (zone: string, color: string) =>
    selectedZone === zone ? '#FF4081' : color;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View><Text>jjj</Text></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
  },
  instructions: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    paddingHorizontal: 10,
  },
});

export default InteractiveBodyMap;
