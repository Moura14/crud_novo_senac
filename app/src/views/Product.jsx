// MinhaTela.jsx
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { listarProdutos } from '../controllers/produtoController';



export default function Product({navigation}) {
  const handlePress = () => {
    navigation.navigate('CadastroProduto')
    console.log('dfijosadijf');
  }

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);

useFocusEffect(
  useCallback(() => {
    async function carregarProdutos() {
      try {
        setLoading(true);

        const resultado = await listarProdutos();
        console.log(resultado);
        setProdutos(resultado);

      } catch (error) {
        console.log("Erro ao carregar produtos:", error);

      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
    
    // Opcional: Adicionar uma função de limpeza
    return () => {
      // Qualquer lógica para limpar ao desfocar, se necessário
    };
  }, []) // Dependências vazias garantem que a função só seja recriada uma vez
);



  return (
  <View style={styles.container}>


    <ScrollView contentContainerStyle={{padding: 20}}>
      {produtos.map((item) => (
        <View key={item.id} style={styles.card}>
          <View>
        <Text style={styles.title}>{item.nome}</Text>
        <Text style={styles.subtitle}>{item.descricao}</Text>
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
      ))}
    </ScrollView>
    
    <TouchableOpacity style={styles.fab} onPress={handlePress}>
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,                  
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
