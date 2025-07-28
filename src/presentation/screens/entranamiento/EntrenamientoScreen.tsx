import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InteractiveBodyMap from '../../components/InteractiveBodyMap/InteractiveBodyMap';
import BodyMapBack from '../../components/InteractiveBodyMap/BodyMapBack';

export const EntrenamientoScreen = () => {
  return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFF' }}>
        <Text>Entrenamiento</Text>
      </View>
  )
}
