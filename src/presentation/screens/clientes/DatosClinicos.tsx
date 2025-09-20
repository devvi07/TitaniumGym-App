import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const DatosClinicos = ({ route, navigation }: any) => {

    const [loading, setLoading] = useState(true);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }} edges={['bottom']}>
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                {
                    loading ?
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                        >
                            <ScrollView>
                                <Text>Datos clínicos</Text>
                            </ScrollView>
                        </KeyboardAvoidingView> :
                        <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 250 }}>
                            <ActivityIndicator animating={true} color={'#B8860B'} size={50} />
                        </View>
                }
            </View>
        </SafeAreaView>
    )
}
