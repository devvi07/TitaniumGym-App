import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HistoricoMedidas = () => {
    const [loading, setLoading] = useState(true);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }} edges={['bottom']}>
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>

                {
                    loading ?
                        <ScrollView>
                            <Text>Historico de medidas</Text>
                        </ScrollView>
                        : <View></View>
                }

            </View>
        </SafeAreaView>
    )
}
