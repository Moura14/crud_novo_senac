// MinhaTela.jsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Product({navigation}) {
  const handlePress = () => {
    navigation.navigate('CadastroProduto')
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fab} onPress={handlePress}>
       <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                  
    justifyContent: "center", 
    alignItems: "center",     
    backgroundColor: "#f2f2f2"
  },
  texto: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2"
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
    right: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
   fabText: {
    color: 'white',
    fontSize: 30,
  },

});
