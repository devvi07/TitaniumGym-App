import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

export const BottomNav = ({ navigation, id }: any) => {

    const hadleMedidas = () => navigation.navigate('RegistrarMedidas', { id: id });
    const hadleEditarCliente = () => navigation.navigate('EditarCliente', { id: id });
    const hadleDatosClinicos = () => navigation.navigate('DatosClinicos', { id: id });

    return (
        <View style={styles.container}>

            <View style={styles.innerContainer}>

                <TouchableOpacity onPress={hadleEditarCliente}>
                    <View style={{ alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
                        <Icon
                            source="account-edit"
                            color={"#8B6508"}
                            //color={"#FFF"}
                            size={40}
                        />
                        <Text style={{ color: '#8B6508', fontWeight: '700', textAlign: 'center' }}>
                            {'Editar\ncliente'}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={hadleMedidas}>
                    <View style={{ alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
                        <Icon
                            source="file-document-edit"
                            color={"#8B6508"}
                            //color={"#FFF"}
                            size={40}
                        />
                        <Text style={{ color: '#8B6508', fontWeight: '700', textAlign: 'center' }}>
                            {'Registrar\nmedidas'}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={hadleDatosClinicos}>
                    <View style={{ alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
                        <Icon
                            source="file-account"
                            color={"#8B6508"}
                            //color={"#FFF"}
                            size={40}
                        />
                        {/*<Text style={{ color: '#8B6508', fontWeight: '700', textAlign: 'center' }}>*/}
                        <Text style={{ color: '#8B6508', fontWeight: '700', textAlign: 'center' }}>
                            {'Datos\n Clínicos'}
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'transparent',
    },
    innerContainer: {
        //backgroundColor: '#F6F6F6',
        //backgroundColor: '#8B6508',
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 5,
    },
});