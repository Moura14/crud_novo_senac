import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cadastro from './src/views/Cadastro';
import LoginScreen from "./src/views/LoginScreens";


const Stack = createNativeStackNavigator();


export default function Index() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
  );
}
 