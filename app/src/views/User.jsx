// MinhaTela.jsx
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deletarCliente, listarClientes } from '../controllers/clienteController';

export default function User({navigation}) {

  const [cliente, setCliente] = useState([]);
    const [loading, setLoading] = useState(false);




    
  useFocusEffect(
    useCallback(() => {
        async function carregarClientes() {
          try {
            setLoading(true);
            const resultado = await listarClientes();
            console.log(resultado);
            setCliente(resultado);
          } catch (error) {
            console.log('Erro ao carregar produtos:', error);
          } finally {
            setLoading(false);
          }
        }
        carregarClientes();
      }, [])
  )

  const handleDelete = async (clienteId) => {
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
                await deletarCliente(clienteId);
                setCliente((prevCliente) =>
                prevCliente.filter((cliente) => cliente.id !== clienteId)
              );
              } catch (error) {
                console.log('Erro ao excluir produto:', error);
              }
            }
          }
        ]
      );
    };
  

  const handlePress = () => {
    navigation.navigate('CadastroCliente')
  }

  return (
  <View style={styles.container}>
    {loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={{
          flex: cliente.length === 0 ? 1 : undefined,
          padding: 20,
          justifyContent: cliente.length === 0 ? 'center' : 'flex-start',
          alignItems: cliente.length === 0 ? 'center' : 'stretch'
        }}
      >
        {cliente.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>Nenhum cliente encontrado</Text>
          </View>
        ) : (
          cliente.map((item) => (
            <View key={item.id} style={styles.card}>
              <View>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.telefone}>{item.endereco}</Text>
                <Text style={styles.endereco}>{item.telefone}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => console.log("editar")}>
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
