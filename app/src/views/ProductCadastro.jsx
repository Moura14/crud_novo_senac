import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { cadastrarProduto, editarProduto } from '../controllers/produtoController';

export default function ProdutoForm({navigation, route}) {

  const [loading, setLoading] = useState(false);
  const [displayTelefone, setDisplayTelefone] = useState('');

  const categorias = ['Eletrônicos', 'Roupas', 'Alimentos', 'Livros'];

  const [dadosFormulario, setDadosFormulario] = useState({
    id: '',
    nome: '',
    descricao: '',
    categoria: '',
    preco: '',
    telefone: ''
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


const handleInputChange = (campo, valor) => {
  if (campo === "preco") {
    valor = formatCurrency(valor);
  }

  setDadosFormulario((prev) => ({
    ...prev,
    [campo]: valor
  }));
};

const handlePhoneChange = (text) => {
  const digits = text.replace(/\D/g, '');
  setDadosFormulario((prev) => ({
    ...prev,
    telefone: digits
  }));
};

// keep displayTelefone in sync with raw telefone
useEffect(() => {
  setDisplayTelefone(formatPhone(dadosFormulario.telefone));
}, [dadosFormulario.telefone]);


function formatCurrency(value) {
  const number = Number(value.replace(/\D/g, "")) / 100;
  if (isNaN(number)) return "";
  
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatPhone(value) {
  const digits = (value || "").toString().replace(/\D/g, "");
  if (!digits) return "";


  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (digits.length <= 2) {
    return `(${ddd}`;
  }

  if (rest.length <= 4) {
    return `(${ddd}) ${rest}`;
  }

  
  if (rest.length <= 8) {
    return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`.replace(/-$/,'');
  }

  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5, 9)}`;
}


useEffect(() => {
  if(produto){
    setDadosFormulario(produto)
    setDisplayTelefone(formatPhone(produto.telefone || ''))
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

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={formatPhone(dadosFormulario.telefone)}
            onChangeText={(text) => handlePhoneChange(text)}
            placeholder="(DD) 9XXXX-XXXX"
            keyboardType="phone-pad"
            maxLength={15}
          />

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
    marginBottom: 10,
    marginTop: 15,
    fontSize: 16,
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
