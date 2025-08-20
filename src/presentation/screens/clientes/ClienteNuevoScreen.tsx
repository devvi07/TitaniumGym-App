import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator, Button, Card, TextInput } from 'react-native-paper';
import log from '../../../config/helpers/ConfigLogger';
import { SafeAreaView } from 'react-native-safe-area-context';

const Item = ({ item, width }: any): React.ReactElement => (

    <View style={{ marginBottom: 10, marginHorizontal: 16 }}>
        <Card style={[styles.card, { backgroundColor: '#FFF', borderRadius: 8 }]} >

            <Card.Content>

                <View
                    style={{
                        backgroundColor: '#FFF',
                        flexDirection: 'row'
                    }}
                >

                    <View style={{ right: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                log.debug('onPress');
                            }}
                        >
                            <Image
                                source={require('../../../assets/img/Asset2.png')}
                                style={{ width: 90, height: 90, borderRadius: 5 }}
                            />
                            {/*
                item.foto == "" ?
                <Image
                  source={require('../../../assets/img/user.png')}
                  style={{ width: 90, height: 90, borderRadius: 5 }}
                />:
                <FastImage
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                  source={{
                    uri: `${item.foto}`,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              */}

                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10 }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.label, { width: width * 0.23 }]}>Nombre: </Text>
                            <Text style={styles.value}>{`${item.data.name}`}</Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.label, { width: width * 0.23 }]}>Teléfono: </Text>
                            <Text style={styles.value}>{`${item.data.telefono}`}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.label, { width: width * 0.23 }]}>Email: </Text>
                            <Text style={styles.value}>{`${item.data.email}`}</Text>
                        </View>

                        

                    </View>

                    <View style={{ top: 30, left: -10 }} >
                        <TextInput.Icon
                            //icon={ itemActivo === index ?'chevron-up-circle' : 'chevron-right-circle'  } left: width * 0.85, top: -70
                            icon={'chevron-right-circle'}
                            size={27}
                            color={'#B8860B'}
                            onPress={() => {
                                //toggleTarjeta(index);
                            }}
                        />
                    </View>

                </View>

            </Card.Content>

        </Card>
    </View>

);

export default React.memo(Item, (prevProps, nextProps) => {
    return (
        prevProps.item === nextProps.item &&
        prevProps.index === nextProps.index &&
        prevProps.itemActivo === nextProps.itemActivo
    );
});

export const ClienteNuevoScreen = ({ route, navigation }: any) => {

    const isFocused = useIsFocused();
    const { width, height } = useWindowDimensions();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        }
    ];

    const getClientes = async () => {

        try {

            setLoading(false);
            const URI = `https://titaniumgym-ws.onrender.com/api/usuario`;

            const response = await fetch(URI, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            log.debug("🚀 ~ getClientes ~ data:", data);
            const oCliente: any = [];
            for(const cliente of data){
                log.warn(`cliente: ${cliente.nombre}`);
                if(cliente.tipoUsuario !== 1)
                    oCliente.push(cliente);
            }
            
            setData(oCliente);
            setLoading(true);

        } catch (e) {
            log.error('[developerMode] Error al obtener acceso a la App -> ', e);
            setLoading(true);
        }

    };

    useEffect(() => {
        getClientes();
    }, [isFocused]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['bottom']} >

            {
                loading ?
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        
                        {
                            data.length>0 ?
                            <View style={{}}>
                                <FlatList
                                    data={data}
                                    renderItem={({ item }) => <Item item={item} width={width} />}
                                    keyExtractor={(item: any) => item._id}
                                    style={{ marginTop: 10, marginBottom: 40 }}
                                />
                            </View>:
                            <View style={{ flex: 1, marginTop: 180 }}>
                                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
                                    No existen clientes registrados.
                                </Text>
                            </View>
                        }

                        <View style={{ position: 'absolute', bottom: 0, width: '100%', }}>
                            <Button
                                icon="account-plus"
                                mode="contained"
                                style={{
                                    borderRadius: 0
                                }}
                                buttonColor='#000'
                                textColor='#B8860B'
                                rippleColor={'#B8860B'}
                                onPress={() => { navigation.navigate('AddCliente'); }}
                            >
                                Agregar cliente
                            </Button>
                        </View>
                    </View> :
                    <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
                        <ActivityIndicator animating={true} color={'#B8860B'} size={50} />
                    </View>
            }


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontSize: 15,
        color: "#333",
        //width: 90,
    },
    value: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#4B4B4B",
    },
    card: {
        //marginBottom: 5,
    },
    rowBack: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor: '#CCC',
        backgroundColor: '#FFF',
        paddingRight: 0,
        width: '100%'
    },
    backButton: {
        width: 80,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tarjetaButton: {
        backgroundColor: '#4CAF50',
    },
    textoAccion: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
