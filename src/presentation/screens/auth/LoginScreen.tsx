import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Text, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = ({ navigation }: any) => {
    
    const { width, height } = useWindowDimensions();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");
    const [sessionUser, setSessionUser] = useState(false);
    const [pass, setPass] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const keyBoardListener = () => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }

    useEffect(() => {
        keyBoardListener();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }} edges={['top', 'bottom']}>
            <View style={{ flex: 1, backgroundColor: '#000' }}>
            {
                loading ?
                <>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Image source={require("../../../assets/img/Asset2.png")}
                        style={{
                            width: 300,
                            height: keyboardVisible ? 200 : 300,
                            resizeMode: "contain"
                        }}
                    />
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 10}}>
                    <TextInput
                        label="Usuario"
                        value={user}
                        onChangeText={text => setUser(text)}
                        theme={{ colors: { primary: '#B8860B' } }}
                        style={{ borderRadius: 7, backgroundColor: '#FFF', borderColor: '#B8860B' }}
                        textColor='#000'
                        autoCapitalize='none'
                    />
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <TextInput
                        label="Contraseña"
                        value={pass}
                        onChangeText={text => setPass(text)}
                        theme={{ colors: { primary: '#B8860B' } }}
                        style={{ borderRadius: 7, backgroundColor: '#FFF', borderColor: '#B8860B' }}
                        textColor='#000'
                        secureTextEntry={secureTextEntry}
                        right={
                            <TextInput.Icon
                                icon={secureTextEntry ? 'eye-off' : 'eye'}
                                color={'#B8860B'}
                                onPress={() => {
                                    setSecureTextEntry(!secureTextEntry);
                                }}
                            />
                        }
                        onSubmitEditing={()=>{ }}
                        autoCapitalize='none'
                    />
                </View>

                <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                    <Button
                        mode="contained"
                        onPress={()=>{ 
                            navigation.navigate('Navigation');
                        }}
                        buttonColor='#B8860B'
                        labelStyle={{ color: '#FFF' }}
                        style={{ borderRadius: 7 }}
                    >
                        Entrar
                    </Button>
                </View>
                </> :
                <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
                    <ActivityIndicator animating={true} color={'#004389'} size={50} />
                </View>
            }
        </View>
        </SafeAreaView>
    )
}