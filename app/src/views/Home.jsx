import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Product from './Product';
import User from './User';

const Tab = createBottomTabNavigator();

export default function App() {


  const handlerLogin = () => {

  }  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({ 
        headerShown: true,
        tabBarActiveTintColor: "#4A90E2",
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
            backgroundColor: '#4A90E2',
            elevation: 0,
            shadowOpacity: 0,
            shadowOffset: { height: 0, width: 0 },
            shadowRadius: 0,
        },
        headerTintColor: '#ffffff',
        headerRight: () => (
            <Ionicons 
            name='log-out-outline'
            size={25}
            color='#ffffffff'
            style={{marginRight: 15}}
            onPress={handlerLogin}
            >
            </Ionicons>
        ),
        tabBarIcon: ({ color, size }) => {
          let iconNome;

          if (route.name === 'Produtos') {
            iconNome = 'pricetag-outline';
          } else if (route.name === 'Cliente') {
            iconNome = 'person-outline';
          }

          return <Ionicons name={iconNome} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name='Produtos' component={Product} />
      <Tab.Screen name='Cliente' component={User} />
    </Tab.Navigator>
  );
}
