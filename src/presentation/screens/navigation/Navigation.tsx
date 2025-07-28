import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { HomeScreen } from '../home/HomeScreen';
import { ProfileScreen } from '../profile/ProfileScreen';
import { EntrenamientoScreen } from '../entranamiento/EntrenamientoScreen';
import { ClienteNuevoScreen } from '../clientes/ClienteNuevoScreen';

export type RootStackParams = {
  Home: undefined;
  ClienteNuevo: undefined;
  Profile: undefined;
  Training: undefined;
}

const Drawer = createDrawerNavigator<RootStackParams>();

// 🔹 Componente Personalizado del Drawer
const CustomDrawerContent = (props: any) => {

  const state = props.navigation.getState();
  const currentRoute = state.routes[state.index].name;


  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#000' }}>
      {/* Header del Drawer */}
      <View style={[styles.headerContainer, { paddingBottom: 10, backgroundColor: '#000' }]}>
        <Image source={require("../../../assets/img/Asset2.png")} style={[styles.logo]} />
      </View>

      {/*Opciones del Drawer */}
      <DrawerItem
        label={() => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginLeft: -20,
              marginRight: -40,
              marginVertical: -15,
              padding: 15,
              backgroundColor: currentRoute === "Home" ? "#B8860B" : "#000",
              borderRadius: 0
            }}
          >
            <List.Icon
              style={{ flex: 1, paddingLeft: 5 }}
              icon={"home"}
              color={"#FFF"}
            />
            <Text style={{ flex: 10, color: "#FFF", fontSize: 16, textAlignVertical: "center", marginLeft: 20, fontWeight: 'bold' }}>
              {'Home'}
            </Text>
          </View>
        )}
        onPress={() => { props.navigation.navigate("Home") }}
      />

      <DrawerItem
        label={() => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginLeft: -20,
              marginRight: -40,
              marginVertical: -15,
              padding: 15,
              backgroundColor: currentRoute === "ClienteNuevo" ? "#B8860B" : "#000",
              borderRadius: 0
            }}
          >
            <List.Icon
              style={{ flex: 1, paddingLeft: 5 }}
              icon={"account-multiple-plus"}
              color={"#FFF"}
            />
            <Text style={{ flex: 10, color: "#FFF", fontSize: 16, textAlignVertical: "center", marginLeft: 20, fontWeight: 'bold' }}>
              {'Añadir nuevo cliente'}
            </Text>
          </View>
        )}
        onPress={() => { props.navigation.navigate("ClienteNuevo") }}
      />

      <DrawerItem
        label={() => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginLeft: -20,
              marginRight: -40,
              marginVertical: -15,
              padding: 15,
              backgroundColor: currentRoute === "Profile" ? "#B8860B" : "#000",
              borderRadius: 0
            }}
          >
            <List.Icon
              style={{ flex: 1, paddingLeft: 5 }}
              icon={"account"}
              color={"#FFF"}
            />
            <Text style={{ flex: 10, color: "#FFF", fontSize: 16, textAlignVertical: "center", marginLeft: 20, fontWeight: 'bold' }}>
              {'Mi perfil'}
            </Text>
          </View>
        )}
        onPress={() => { props.navigation.navigate("Profile") }}
      />

      <DrawerItem
        label={() => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginLeft: -20,
              marginRight: -40,
              marginVertical: -15,
              padding: 15,
              backgroundColor: currentRoute === "Training" ? "#B8860B" : "#000",
              borderRadius: 0
            }}
          >
            <List.Icon
              style={{ flex: 1, paddingLeft: 5 }}
              //icon={"arm-flex"}
              icon={"dumbbell"}
              color={"#FFF"}
            />
            <Text style={{ flex: 10, color: "#FFF", fontSize: 16, textAlignVertical: "center", marginLeft: 20, fontWeight: 'bold' }}>
              {'Entrenamiento'}
            </Text>
          </View>
        )}
        onPress={() => { props.navigation.navigate("Training") }}
      />

      <DrawerItem
        label={() => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginLeft: -20,
              marginRight: -40,
              marginVertical: -15,
              padding: 15,
              backgroundColor: "#000"
            }}
          >
            <List.Icon
              style={{ flex: 1, paddingLeft: 5 }}
              icon={"logout"}
              color={"#FFF"}
            />
            <Text style={{ flex: 10, color: "#FFF", fontSize: 16, textAlignVertical: "center", marginLeft: 20 }}>Salir</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate("Login")}
      />

    </DrawerContentScrollView>
  );
}

export const Navigation = () => {

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: "#000" }
      }}
    >

      <Drawer.Screen
        options={{
          title: '',
          headerShown: true,
          headerStyle: { backgroundColor: '#000' },
          headerTitle: () => (
            <Image
              source={require('../../../assets/img/Asset2.png')}
              style={{ width: 140, height: 60, resizeMode: 'contain' }}
            />
          ),
          headerTitleAlign: 'center',
          headerTintColor: '#B8860B',
        }}
        name="ClienteNuevo"
        component={ClienteNuevoScreen}
      />

      <Drawer.Screen
        options={{
          title: '',
          headerShown: true,
          headerStyle: { backgroundColor: '#000' },
          headerTitle: () => (
            <Image
              source={require('../../../assets/img/Asset2.png')}
              style={{ width: 140, height: 60, resizeMode: 'contain' }}
            />
          ),
          headerTitleAlign: 'center',
          headerTintColor: '#B8860B',
        }}
        name="Home"
        component={HomeScreen}
      />

      <Drawer.Screen
        options={{
          title: '',
          headerShown: true,
          headerStyle: { backgroundColor: '#000' },
          headerTitle: () => (
            <Image
              source={require('../../../assets/img/Asset2.png')}
              style={{ width: 140, height: 60, resizeMode: 'contain' }}
            />
          ),
          headerTitleAlign: 'center',
          headerTintColor: '#B8860B',
        }}
        name="Profile"
        component={ProfileScreen}
      />

      <Drawer.Screen
        options={{
          title: '',
          headerShown: true,
          headerStyle: { backgroundColor: '#000' },
          headerTitle: () => (
            <Image
              source={require('../../../assets/img/Asset2.png')}
              style={{ width: 140, height: 60, resizeMode: 'contain' }}
            />
          ),
          headerTitleAlign: 'center',
          headerTintColor: '#B8860B',
        }}
        name="Training"
        component={EntrenamientoScreen}
      />

    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    //height: 70,
    flexDirection: 'row'
  },
  logo: {
    width: 120,
    height: 80,
    resizeMode: "contain",
  },
});