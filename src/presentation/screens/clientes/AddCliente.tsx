import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, Card, IconButton, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import log from '../../../config/helpers/ConfigLogger';
import { AlertNotification } from '../../components/modals/AlertNotification';

export const AddCliente = ({ route, navigation }: any) => {

    const [ loading, setLoading ] = useState(true);

    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ telefono, setTelefono ] = useState('');
    const [ fechaNacimiento, setFechaNacimiento ] = useState('');
    const [ objetivo, setObjetivo ] = useState('');
    const [ servicio, setServicio ] = useState('');
    const [ statusService, setStatusService ] = useState(0);

    //Para los mensajes modales
    const [titleAlert, setTitleAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [iconAlert, setIconAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    
    const toggleAlert = () => setShowAlert(!showAlert);
    const fnAlert = () => {

        if(statusService == 201)
            navigation.goBack();
        else
            toggleAlert();
    };
    
    const setAlert = (title: string, message: string, icon: string) => {
        setTitleAlert(title);
        setMessageAlert(message);
        setIconAlert(icon);
        setShowAlert(true);
    }


    const addCliente = async() =>{

        try {

            setLoading(false);

            if(
                nombre.length === 0 || email.length === 0 ||
                telefono.length === 0 || fechaNacimiento.length === 0 ||
                objetivo.length === 0 || servicio.length === 0
            ){ 
                setLoading(true);
                setAlert('Alerta','¡Todos los campos son necesarios!', 'warning');
                return;
            }

            const URI = `https://titaniumgym-ws.onrender.com/api/usuario`;
            const raw = JSON.stringify(
                {
                    "nombre": `${nombre.split(" ")[0]}`,
                    "password": "Titanium25",
                    "data":{
                        "name": `${nombre.trim()}`,
                        "email": `${email.trim()}`,
                        "telefono": `${telefono.trim()}`,
                        "fechaNacimiento": `${fechaNacimiento.trim()}`,
                        "objetivo": `${objetivo.trim()}`,
                        "servicio": `${servicio.trim()}`,
                    },
                    "tipoUsuario": 2
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
            log.debug("🚀 ~ getClientes ~ data:", data);
            if(data){
                setStatusService(201);
                setLoading(true);
                setAlert('Información','¡El cliente se registró correctamente!', 'success');
            }else{
                setStatusService(0);
                setLoading(true);
                setAlert('Alerta','¡Ocurrió un error en el registro!', 'warning');
            }
            

        } catch (e) {
            log.error('[developerMode] Error al obtener acceso a la App -> ', e);
            setLoading(true);
        }

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }} edges={['bottom']}>
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                {
                    loading?
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                    >
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                        >

                            <View style={[ styles.container2 ]}>

                                <View style={styles.containerTitle}>
                                    <Text style={styles.title}>Datos personales</Text>
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Nombre"
                                        value={nombre}
                                        onChangeText={text => setNombre(text)}
                                        theme={{ colors: { primary: '#B8860B' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Email"
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                        theme={{ colors: { primary: '#B8860B' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Teléfono"
                                        value={telefono}
                                        onChangeText={text => setTelefono(text)}
                                        theme={{ colors: { primary: '#B8860B' } }}
                                        style={styles.input}
                                        textColor='#000'
                                        keyboardType= 'phone-pad'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Fecha de nacimiento"
                                        value={fechaNacimiento}
                                        onChangeText={text => setFechaNacimiento(text)}
                                        theme={{ colors: { primary: '#B8860B' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Objetivo"
                                        value={objetivo}
                                        onChangeText={text => setObjetivo(text)}
                                        theme={{ colors: { primary: '#B8860B' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Servicio"
                                        value={servicio}
                                        onChangeText={text => setServicio(text)}
                                        theme={{ colors: { primary: '#B8860B' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>


                                {/** SECCIÓN PARA CONSIDERAR LA FOTO */}
                                {/*<View style={{ marginHorizontal: 40, marginTop: 15 }}>
                                    <Card style={{ margin: 16 }} onPress={()=>{}}>

                                        <View style={{ height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
                                            <IconButton icon="camera" size={80} style={{ backgroundColor: '#fFFF' }} />
                                        </View>
                                        <Card.Title
                                            title="Tomar foto"
                                            titleStyle={{ textAlign: 'center', color: '#000', fontWeight: '700' }}
                                            style={{
                                                backgroundColor: '#F6F6F6',
                                                borderBottomEndRadius: 7,
                                                borderBottomLeftRadius: 7
                                            }}
                                        />

                                    </Card>
                                    {
                                        photos.length>0 &&
                                        <View>
                                            <Text style={{ textAlign: 'center', fontSize: 15, color:'#000', fontWeight: '600' }}>{`Fotos adjuntas: ${photos.length}\n`} </Text>
                                        </View>
                                    }
                                </View>*/}
                                
                                <View style={{ marginHorizontal: 20, marginTop: 25, marginBottom: 25 }}>
                                    <Button
                                        icon="check-bold"
                                        mode="contained"
                                        onPress={ addCliente }
                                        buttonColor='#B8860B'
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


                    </KeyboardAvoidingView>:
                    <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 250}}>
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
