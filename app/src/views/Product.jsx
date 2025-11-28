// MinhaTela.jsx
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deletarProduto, listarProdutos } from '../controllers/produtoController';



  export default function Product({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    navigation.navigate('CadastroProduto');
  };

  const handleEditar = (produtoId) => {
    const produtoEditar = produtos.find(p => p.id == produtoId)

    if(produtoEditar){
      navigation.navigate('CadastroProduto', {
        produtoParaEdicao: produtoEditar
      });
    }
  }

  


  const handleDelete = async (produtoId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletarProduto(produtoId);
              setProdutos((prevProdutos) =>
              prevProdutos.filter((item) => item.id !== produtoId)
            );
            } catch (error) {
              console.log('Erro ao excluir produto:', error);
            }
          }
        }
      ]
    );
  };

  function formatPhoneDisplay(value) {
     const s = (value || '').toString().trim();
  if (!s) return '';

  
  let digits = s.replace(/\D/g, '');


  if (digits.startsWith('55') && digits.length > 2) digits = digits.slice(2);


  if (digits.length === 11) {
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  }

 
  if (digits.length === 10) {
    return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
  }


  if (digits.length === 9) {
    return `${digits.slice(0,5)}-${digits.slice(5)}`;
  }


  if (digits.length === 8) {
    return `${digits.slice(0,4)}-${digits.slice(4)}`;
  }

  
  if (digits.length > 11) {
    const ddd = digits.slice(0,2);
    const rest = digits.slice(2);
    return `(${ddd}) ${rest.slice(0, rest.length - 4)}-${rest.slice(-4)}`;
  }

  return s;
}

  useFocusEffect(
    useCallback(() => {
      async function carregarProdutos() {
        try {
          setLoading(true);
          const resultado = await listarProdutos();
          console.log(resultado);
          setProdutos(resultado);
        } catch (error) {
          console.log('Erro ao carregar produtos:', error);
        } finally {
          setLoading(false);
        }
      }
      carregarProdutos();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ?(
        <ActivityIndicator size="large" color="#4A90E2" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
      ) : (
        <ScrollView contentContainerStyle={{ 
          flex: produtos.length === 0 ? 1 : undefined,
          padding: 20,
          justifyContent: produtos.length === 0 ? 'center' : 'flex-start',
          alignItems: produtos.length === 0 ? 'center' : 'stretch'
         }}>
  {produtos.length === 0 ? (
    <View style={styles.emptyContainer}>
      <Text>Nenhum produto encontrado</Text>
    </View>
  ) : (
    produtos.map((item) => (
      <View key={item.id} style={styles.card}>
        <View>
          <Text style={styles.title}>{item.nome}</Text>
          <Text style={styles.subtitle}>{item.descricao}</Text>
          <Text style={styles.subtitle}>{item.categoria}</Text>
           <Text style={styles.subtitle}>{formatPhoneDisplay(item.telefone)}</Text>
          <Text style={styles.subtitle}>{item.preco}</Text>
         
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleEditar(item.id)}>
            <Ionicons name="create-outline" size={22} color="#4A90E2" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Ionicons name="trash-outline" size={22} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>
    ))
  )}
</ScrollView>
      )}
      
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

})
