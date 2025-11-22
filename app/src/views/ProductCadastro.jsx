import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { cadastrarProduto, editarProduto } from '../controllers/produtoController';

export default function ProdutoForm({navigation, route}) {

  const [loading, setLoading] = useState(false);

  const categorias = ['Eletrônicos', 'Roupas', 'Alimentos', 'Livros'];

  const [dadosFormulario, setDadosFormulario] = useState({
    id: '',
    nome: '',
    descricao: '',
    categoria: '',
    preco: ''
  });

  const isEditiing = !!dadosFormulario.id;

  const produto = route.params?.produtoParaEdicao

  

  async function handleSubmit () {
    const dadosSalvar = {...dadosFormulario};
    delete dadosSalvar.id;

  try {
    if(isEditiing){
      setLoading(true)
      const result = await editarProduto(dadosFormulario.id,dadosFormulario.nome, dadosFormulario.descricao, dadosFormulario.categoria, dadosFormulario.preco);
      navigation.goBack();
    }else{
      setLoading(true);
      const idCriado = await cadastrarProduto(dadosFormulario.nome, dadosFormulario.descricao, dadosFormulario.categoria, dadosFormulario.preco);
      console.log(idCriado);
    navigation.goBack();
    }
    

    

  } catch(error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


const handleInputChange = (key, value) => {
  setDadosFormulario(prevDados => ({
    ...prevDados,
    [key]: value
  }))
}

useEffect(() => {
  if(produto){
    setDadosFormulario(produto)
  }
}, [produto])


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
            value={dadosFormulario.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
            placeholder="Digite o nome do produto"
          
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={dadosFormulario.descricao}
            onChangeText={(text) => handleInputChange('descricao', text)}
            placeholder="Digite a descrição"
            multiline
          />

          <Text style={styles.label}>Categoria</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={dadosFormulario.categoria}
              onValueChange={(text) => handleInputChange('categoria', text)}
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
            value={dadosFormulario.preco}
            onChangeText={(text) => handleInputChange('preco', text)}
            placeholder="Digite o preço"
            keyboardType="numeric"
          />

        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 20 }} />
        ) : (   <Button title= {isEditiing ? 'Salvar Edição' :  "Cadastrar Produto"} onPress={handleSubmit} />)}
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
