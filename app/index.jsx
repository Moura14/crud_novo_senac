import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cadastro from './src/views/Cadastro';
import Home from './src/views/Home';
import LoginScreen from "./src/views/LoginScreens";
import ProductCadastro from './src/views/ProductCadastro';
import UserCadastro from './src/views/UserCadastro';


const Stack = createNativeStackNavigator();


export default function Index() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}></Stack.Screen>
         <Stack.Screen name="CadastroProduto" component={ProductCadastro} options={{headerShown: false}}></Stack.Screen>
         <Stack.Screen name="CadastroCliente" component={UserCadastro} options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
  );
}
 