import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import log from '../../../config/helpers/ConfigLogger';
import { ActivityIndicator, Button, Card, Icon } from 'react-native-paper';
import { AlertNotification } from '../../components/modals/AlertNotification';
import { useIsFocused } from '@react-navigation/native';
import { formatDateDDMMMYYY } from '../utils/Utils';
import FastImage from 'react-native-fast-image';
import { BottomNav } from '../../components/BottomNav/BottomNav';
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const ClienteDetail = ({ route, navigation }: any) => {

  const { oCliente } = route.params;
  const { width, height } = useWindowDimensions();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [oMedidas, setOmedidas] = useState([]);
  const [photo, setPhoto] = useState('');

  //Para los mensajes modales
  const [titleAlert, setTitleAlert] = useState('');
  const [messageAlert, setMessageAlert] = useState('');
  const [iconAlert, setIconAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = () => setShowAlert(!showAlert);
  const fnAlert = () => {

    /*if (statusService == 201)
      navigation.goBack();
    else*/
    toggleAlert();
  };

  const setAlert = (title: string, message: string, icon: string) => {
    setTitleAlert(title);
    setMessageAlert(message);
    setIconAlert(icon);
    setShowAlert(true);
  }

  const takePhoto = async() => {

    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.7,
      cameraType: 'back'
    });

    if (result.assets && result.assets[0].uri) {
      setLoading(false);
      const image = result.assets[0];
      const data = new FormData();
      data.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
      data.append('upload_preset', 'campe-app'); // lo configuras en Cloudinary

      const res = await fetch('https://api.cloudinary.com/v1_1/dyfx8jypt/image/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      console.log('json.secure_url -> ', json.secure_url)
      setPhoto(json.secure_url ?? '');
      setLoading(true);
      //return json.secure_url; // esta es la URL para guardar
    }
  }

    const adjuntarPhoto = () => {
      console.log('Adjuntar foto');
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.7,
      };

      launchImageLibrary(options, async (response) => {
        if (response.didCancel) {
          console.log('Selección cancelada');
        } else if (response.errorMessage) {
          console.log('Error:', response.errorMessage);
        } else if (response.assets && response.assets[0].uri) {

          setLoading(false);
          const image = response.assets[0];
          const data = new FormData();
          data.append('file', {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          });
          data.append('upload_preset', 'Titanium');

          const res = await fetch('https://api.cloudinary.com/v1_1/dyfx8jypt/image/upload', {
            method: 'POST',
            body: data,
          });

          const json = await res.json();
          console.log('json.secure_url -> ', json.secure_url)
          setPhoto(json.secure_url ?? '');
          setLoading(true);
        }

      });

    };

    const getMedidas = async () => {

      try {

        setLoading(false);
        const URI = `https://titaniumgym-ws.onrender.com/api/medidas/${oCliente._id}`;

        const response = await fetch(URI, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();
        log.debug("🚀 ~ getMedidas ~ data:", data);
        setOmedidas(data);
        setLoading(true);

      } catch (e) {
        log.error('[developerMode] Error al obtener acceso a la App -> ', e);
        setLoading(true);
      }

    };

    useEffect(() => {
      log.debug('oCliente: ', oCliente);
      getMedidas();
    }, [isFocused]);

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

                <View style={{ marginHorizontal: 16, marginTop: 8 }}>

                  <View style={{ marginHorizontal: 60, marginBottom: 8 }}>
                    <Card style={[{ backgroundColor: '#FFF', borderRadius: 8 }]} >
                      <Card.Content>
                        <View style={{ alignItems: 'center' }}>
                          {
                            oCliente.data.foto == "" ?
                              <TouchableOpacity onPress={takePhoto}>
                                <FastImage
                                  style={{ width: 130, height: 130 }}
                                  source={require('../../../assets/img/user.png')}
                                  resizeMode={FastImage.resizeMode.contain}
                                />
                              </TouchableOpacity>
                              :
                              <FastImage
                                style={{ width: 130, height: 130, borderRadius: 20 }}
                                source={{
                                  uri: `${oCliente.data.foto}`,
                                  priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                          }

                          <TouchableOpacity onPress={adjuntarPhoto}>
                            <View style={{ flexDirection: 'row', gap: 2 }}>

                              <View>
                                <Text style={{ textDecorationLine: 'underline', fontSize: 13 }}>
                                  Editar imagen
                                </Text>
                              </View>

                              <View>
                                <Icon
                                  source="camera"
                                  color={"#000"}
                                  size={20}
                                />
                              </View>

                            </View>
                          </TouchableOpacity>

                        </View>
                      </Card.Content>
                    </Card>
                  </View>

                  <Card style={[{ backgroundColor: '#FFF', borderRadius: 8 }]} >
                    <Card.Content>

                      <View style={styles.containerTitle}>
                        <Text style={styles.title}>Datos personales</Text>
                      </View>

                      <View style={{ marginTop: 8, marginHorizontal: 16 }}>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.label, { width: width * 0.27 }]}>Nombre: </Text>
                          <Text style={styles.value}>{`${oCliente.data.name}`}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.label, { width: width * 0.27 }]}>Teléfono: </Text>
                          <Text style={styles.value}>{`${oCliente.data.telefono}`}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.label, { width: width * 0.27 }]}>Email: </Text>
                          <Text style={styles.value}>{`${oCliente.data.email}`}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.label, { width: width * 0.27 }]}>Fecha de N.: </Text>
                          <Text style={styles.value}>{`${oCliente.data.fechaNacimiento}`}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.label, { width: width * 0.27 }]}>Objetivo: </Text>
                          <Text style={styles.value}>{`${oCliente.data.objetivo}`}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.label, { width: width * 0.27 }]}>Servicio: </Text>
                          <Text style={styles.value}>{`${oCliente.data.servicio}`}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.label, { width: width * 0.27 }]}>Estatus: </Text>
                          <Text style={styles.value}>{`${oCliente.data.estatus}`}</Text>
                        </View>

                      </View>

                    </Card.Content>

                  </Card>
                </View>

                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  keyboardShouldPersistTaps="handled"
                >
                  <View style={[styles.container2]}>

                    {
                      oMedidas.length > 0 && <>
                        {
                          oMedidas.map((item: any) => (
                            <View style={{ marginTop: 0 }} key={item._id}>
                              <Card style={[{ backgroundColor: '#FFF', borderRadius: 8 }]} onPress={() => { navigation.navigate('HistoricoMedidas', { medidas: item }) }}>
                                <Card.Content>

                                  <View style={styles.containerTitle}>
                                    <Text style={styles.title}>{`Medidas (Fecha: ${formatDateDDMMMYYY(item.fecha)})`}</Text>
                                  </View>

                                  <View style={{ flexDirection: 'row' }}>

                                    <View style={{ top: 30 }}>
                                      <FastImage
                                        style={{ width: 120, height: 120 }}
                                        source={require('../../../assets/img/ciluetaGim.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                      />
                                    </View>

                                    <View style={{ marginTop: 16, marginHorizontal: 16 }}>

                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.label, { width: width * 0.27 }]}>Peso: </Text>
                                        <Text style={styles.value}>{`${item.peso} Kg`}</Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.label, { width: width * 0.27 }]}>Grasa: </Text>
                                        <Text style={styles.value}>{`${item.grasa} %`}</Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.label, { width: width * 0.27 }]}>Cuello: </Text>
                                        <Text style={styles.value}>{`${item.cuello} cm`}</Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.label, { width: width * 0.27 }]}>Hombros: </Text>
                                        <Text style={styles.value}>{`${item.hombros} cm`}</Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.label, { width: width * 0.27 }]}>Pecho: </Text>
                                        <Text style={styles.value}>{`${item.pecho} cm`}</Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.label, { width: width * 0.27 }]}>Cintura: </Text>
                                        <Text style={styles.value}>{`${item.cintura} cm`}</Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.label, { width: width * 0.27 }]}>Cadera: </Text>
                                        <Text style={styles.value}>{`${item.cadera} cm`}</Text>
                                      </View>

                                    </View>

                                  </View>

                                </Card.Content>

                              </Card>
                            </View>
                          ))
                        }
                      </>
                    }

                  </View>

                  {/*<View style={{ position: 'absolute', bottom: 30, width: '100%' }}>

                  <View style={{ marginHorizontal: 16 }}>
                    <Button
                      icon="note-edit-outline"
                      mode="contained"
                      style={{
                        borderRadius: 10
                      }}
                      buttonColor='#8B6508'
                      textColor='#FFFF'
                      rippleColor={'#F6F6F6'}
                      onPress={() => { navigation.navigate('RegistrarMedidas', { id: oCliente._id }) }}
                    >
                      Registrar medidas
                    </Button>
                  </View>

                </View>*/}

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

                </ScrollView>

                <BottomNav navigation={navigation} id={oCliente._id} />

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
      //backgroundColor: '#F6F6F6',
      marginHorizontal: 8,
      marginTop: 10,
      marginBottom: 90,
      borderRadius: 10
    },
    containerTitle: {
      //marginTop: 16
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
  });