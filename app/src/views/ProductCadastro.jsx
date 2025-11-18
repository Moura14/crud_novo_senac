import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { cadastrarProduto } from '../controllers/produtoController';

export default function ProdutoForm({navigation}) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(false);

  const categorias = ['Eletrônicos', 'Roupas', 'Alimentos', 'Livros'];

  async function handleSubmit () {
  try {
    setLoading(true);

    const idCriado = await cadastrarProduto(nome, descricao, categoria, preco);
    console.log(idCriado);

    if (idCriado) {
      alert('Produto cadastrado com sucesso');
      setNome('');
      setDescricao('');
      setCategoria('');
      setPreco('');
      
    }
    navigation.goBack();

    

  } catch(error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.label}>Nome do Produto</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o nome do produto"
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Digite a descrição"
            multiline
          />

          <Text style={styles.label}>Categoria</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={categoria}
              onValueChange={(itemValue) => setCategoria(itemValue)}
            >
              <Picker.Item label="Selecione uma categoria" value="" />
              {categorias.map((cat, index) => (
                <Picker.Item key={index} label={cat} value={cat} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Preço</Text>
          <TextInput
            style={styles.input}
            value={preco}
            onChangeText={setPreco}
            placeholder="Digite o preço"
            keyboardType="numeric"
          />

        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 20 }} />
        ) : (   <Button title="Cadastrar Produto" onPress={handleSubmit} />)}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,               
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 40,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
});
