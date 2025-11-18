// MinhaTela.jsx
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function User({navigation}) {

  const handlePress = () => {
    navigation.navigate('CadastroCliente')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fab} onPress={handlePress}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
       <View style={styles.card}>
      <View>
        <Text style={styles.title}>Cliente da silva Santos Jr</Text>
        <Text style={styles.subtitle}>22</Text>
      </View>
      

    
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => console.log('editar')}>
          <Ionicons name="create-outline" size={22} color="#4A90E2" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('excluir')}>
          <Ionicons name="trash-outline" size={22} color="#4A90E2" />
        </TouchableOpacity>
      </View>
      
    </View>
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>Cliente da silva Santos Jr</Text>
        <Text style={styles.subtitle}>22</Text>
      </View>
      

    
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => console.log('editar')}>
          <Ionicons name="create-outline" size={22} color="#4A90E2" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('excluir')}>
          <Ionicons name="trash-outline" size={22} color="#4A90E2" />
        </TouchableOpacity>
      </View>
      
    </View>
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
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    elevation: 3,
    width: 350,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#666" },
  actions: { flexDirection: "row", gap: 15 },
  iconButton: { padding: 4 }
});
