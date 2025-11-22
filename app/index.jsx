import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import Cadastro from './src/views/Cadastro';
import Home from './src/views/Home';
import LoginScreen from "./src/views/LoginScreens";
import ProductCadastro from './src/views/ProductCadastro';
import UserCadastro from './src/views/UserCadastro';


const Stack = createNativeStackNavigator();




export default function Index() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      try{
        const token = await AsyncStorage.getItem('TokenUser');
        setUser(token);
      }catch(e){
        console.log('Erro ao buscar token:', e);
      }finally{
        setLoading(false);
      }
    }
    checkUser();
  }, []);
  if(loading){
    return null;
  }

  return (
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}></Stack.Screen>
         <Stack.Screen
           name="CadastroProduto"
           component={ProductCadastro}
           options={{
             headerShown: true,
             headerTitle: '',
             headerStyle: {
               elevation: 0,
               shadowOpacity: 0,
               borderBottomWidth: 0,
             },
             headerShadowVisible: false,
           }}
         />
         <Stack.Screen
           name="CadastroCliente"
           component={UserCadastro}
           options={{
             headerShown: true,
             headerTitle: '',
             headerStyle: {
               elevation: 0,
               shadowOpacity: 0,
               borderBottomWidth: 0,
             },
             headerShadowVisible: false,
           }}
         />
      </Stack.Navigator>
  );
}
 