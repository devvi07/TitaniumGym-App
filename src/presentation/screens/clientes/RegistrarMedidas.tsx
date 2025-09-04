import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertNotification } from '../../components/modals/AlertNotification';
import log from '../../../config/helpers/ConfigLogger';

export const RegistrarMedidas = ({ route, navigation }: any) => {

    const { id } = route.params;
    const [loading, setLoading] = useState(true);
    const [peso, setPeso] = useState('');
    const [grasa, setGrasa] = useState('');
    const [cuello, setCuello] = useState('');
    const [hombros, setHombros] = useState('');
    const [pecho, setPecho] = useState('');
    const [cintura, setCintura] = useState('');
    const [cadera, setCadera] = useState('');

    //Para los mensajes modales
    const [titleAlert, setTitleAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [iconAlert, setIconAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const toggleAlert = () => setShowAlert(!showAlert);
    const fnAlert = () => {

        /*if(statusService == 201)
            navigation.goBack();
        else*/
        toggleAlert();
    };


    const addMedidas = async () => {
        const URI = `https://titaniumgym-ws.onrender.com/api/medidas`;
        const raw = JSON.stringify(
            {
                "peso": `${peso}`,
                "grasa": `${grasa}`,
                "cuello": `${cuello}`,
                "hombros": `${hombros}`,
                "pecho": `${pecho}`,
                "cintura": `${cintura}`,
                "cadera": `${cadera}`,
                "fecha": `${Date.now()}`,
                "usuario": `${id}`
            }
        );

        const response = await fetch(URI, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: raw,
        });

        const data = await response.json();
        log.debug("🚀 ~ addMedidas ~ data:", data);
    }

    useEffect(() => {
        log.debug('Id para registro de medidas: ', id);
    }, []);

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
                            <ScrollView
                                contentContainerStyle={{ flexGrow: 1 }}
                                keyboardShouldPersistTaps="handled"
                            >

                                <View style={[styles.container2]}>

                                    <View style={styles.containerTitle}>
                                        <Text style={styles.title}>Fecha de registro: </Text>
                                    </View>

                                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                        <TextInput
                                            label="Peso corporal (kg)"
                                            value={peso}
                                            onChangeText={text => setPeso(text)}
                                            theme={{ colors: { primary: '#B8860B' } }}
                                            style={styles.input}
                                            textColor='#000'
                                        />
                                    </View>

                                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                        <TextInput
                                            label="Grasa corporal (%)"
                                            value={grasa}
                                            onChangeText={text => setGrasa(text)}
                                            theme={{ colors: { primary: '#B8860B' } }}
                                            style={styles.input}
                                            textColor='#000'
                                        />
                                    </View>

                                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                        <TextInput
                                            label="Cuello"
                                            value={cuello}
                                            onChangeText={text => setCuello(text)}
                                            theme={{ colors: { primary: '#B8860B' } }}
                                            style={styles.input}
                                            textColor='#000'
                                        />
                                    </View>

                                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                        <TextInput
                                            label="Hombros"
                                            value={hombros}
                                            onChangeText={text => setHombros(text)}
                                            theme={{ colors: { primary: '#B8860B' } }}
                                            style={styles.input}
                                            textColor='#000'
                                        />
                                    </View>

                                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                        <TextInput
                                            label="Pecho"
                                            value={pecho}
                                            onChangeText={text => setPecho(text)}
                                            theme={{ colors: { primary: '#B8860B' } }}
                                            style={styles.input}
                                            textColor='#000'
                                        />
                                    </View>

                                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                        <TextInput
                                            label="Cintura"
                                            value={cintura}
                                            onChangeText={text => setCintura(text)}
                                            theme={{ colors: { primary: '#B8860B' } }}
                                            style={styles.input}
                                            textColor='#000'
                                        />
                                    </View>

                                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                        <TextInput
                                            label="Cadera"
                                            value={cadera}
                                            onChangeText={text => setCadera(text)}
                                            theme={{ colors: { primary: '#B8860B' } }}
                                            style={styles.input}
                                            textColor='#000'
                                        />
                                    </View>


                                    <View style={{ marginHorizontal: 20, marginTop: 35, marginBottom: 25 }}>
                                        <Button
                                            icon="check-bold"
                                            mode="contained"
                                            onPress={addMedidas}
                                            buttonColor='#8B6508'
                                            labelStyle={{ color: '#FFF' }}
                                            style={{ borderRadius: 7 }}
                                        >
                                            Registrar
                                        </Button>

                                        <View style={{ marginTop: 10 }}>
                                            <Button
                                                icon="close-thick"
                                                mode="contained"
                                                onPress={() => { navigation.goBack(); }}
                                                buttonColor='#e2e2e2'
                                                labelStyle={{ color: '#000' }}
                                                style={{ borderRadius: 7 }}
                                            >
                                                Cancelar
                                            </Button>
                                        </View>

                                    </View>

                                </View>

                            </ScrollView>

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


                        </KeyboardAvoidingView> :
                        <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 250 }}>
                            <ActivityIndicator animating={true} color={'#B8860B'} size={50} />
                        </View>

                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        marginHorizontal: 8,
        marginTop: 10,
        //marginBottom: 10,
        borderRadius: 10
    },
    containerTitle: {
        marginTop: 16
    },
    title: {
        color: '#000',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16
    },
    input: {
        borderRadius: 7,
        backgroundColor: '#FFF',
        borderColor: '#B8860B'
    }
});
