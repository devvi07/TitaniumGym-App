import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Text, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import log from '../../../config/helpers/ConfigLogger';
import { AlertNotification } from '../../components/modals/AlertNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = ({ navigation }: any) => {

    //https://titaniumgym-ws.onrender.com/api/usuario

    const { width, height } = useWindowDimensions();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");
    const [sessionUser, setSessionUser] = useState(false);
    const [pass, setPass] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const [titleAlert, setTitleAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [iconAlert, setIconAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const toggleAlert = () => setShowAlert(!showAlert);
    const fnAlert = () => toggleAlert();

    const setAlert = (title: string, message: string, icon: string) => {
        setTitleAlert(title);
        setMessageAlert(message);
        setIconAlert(icon);
        setShowAlert(true);
    }

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

    const onLogin = async () => {

        try {

            if(user.length === 0 || pass.length === 0){
                setAlert('Alerta','¡Todos los campos son necesarios!', 'warning');
                return;
            }
            

            setLoading(false);
            const URI = `https://titaniumgym-ws.onrender.com/api/usuario/login`;
            const raw = JSON.stringify({ "nombre": `${user}`, "password": `${pass}` });
            log.debug("🚀 ~ onLogin ~ raw:", raw);

            const response = await fetch(URI, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: raw,
            });

            const data = await response.json();
            log.info('[developerMode] getAcceso App --> ', data);

            if(data.usuario){

                await AsyncStorage.setItem('@KeyUserType', data.usuario.tipoUsuario.toString());
                await AsyncStorage.setItem('@KeyUserName', data.usuario.nombre);
                setLoading(true);
                navigation.navigate('Navigation');
            }else{
                setLoading(true);
                setAlert('Error',`${data.mensaje}`, 'error');
                return;
            }


        } catch (e) {
            log.error('[developerMode] Error al obtener acceso a la App -> ', e);
            setLoading(true);
        }

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

                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
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
                            onSubmitEditing={() => { }}
                            autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                        <Button
                            mode="contained"
                            onPress={ onLogin }
                            buttonColor='#8B6508'
                            labelStyle={{ color: '#FFF' }}
                            style={{ borderRadius: 7 }}
                        >
                            Entrar
                        </Button>
                    </View>

                    <AlertNotification
                        title={titleAlert}
                        message={messageAlert}
                        icon={iconAlert}
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                        cancelar={false}
                        toggleAlert={toggleAlert}
                        fnAlert={fnAlert}
                    />
                    </>:
                    <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
                        <ActivityIndicator animating={true} color={'#B8860B'} size={50} />
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}