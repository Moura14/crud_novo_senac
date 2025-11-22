import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { cadastrarCliente, editarCliente } from '../controllers/clienteController';


export default function ClienteForm({navigation, route}) {
  
  const [loading, setLoading] = useState(false);

  const [dadosFormulario, setDadosFormulario] = useState(
    {
      id: '',
      nome: '',
      email: '',
      telefone: '',
      endereco: '',
      dataNascimento: ''
    }
  )

  const isEditiing = !!dadosFormulario.id;

  const cliente = route.params?.clienteEdicao

 
  

  async function handleSubmit () {
      const dadosSalvar = {...dadosFormulario};
      delete dadosSalvar.id;
  
    try {
      if(isEditiing){
        setLoading(true)
        const result = await editarCliente(dadosFormulario.id,dadosFormulario.nome, dadosFormulario.email, dadosFormulario.telefone, dadosFormulario.endereco, dadosFormulario.dataNascimento);
        navigation.goBack();
      }else{
        setLoading(true);
        const idCriado = await cadastrarCliente(dadosFormulario.nome, dadosFormulario.email, dadosFormulario.telefone, dadosFormulario.endereco, dadosFormulario.dataNascimento);
        console.log(idCriado);
      navigation.goBack();
      }
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if(cliente){
      setDadosFormulario(cliente)
    }
  }, [cliente])

  const handleInputChange = (key, value) => {
  setDadosFormulario(prevDados => ({
    ...prevDados,
    [key]: value
  }))
}


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={dadosFormulario.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
            placeholder="Digite o nome"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={dadosFormulario.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="Digite o email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={dadosFormulario.telefone}
            onChangeText={(text) => handleInputChange('telefone', text)}
            placeholder="Digite o telefone"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={dadosFormulario.endereco}
            onChangeText={(text) => handleInputChange('endereco', text)}
            placeholder="Digite o endereço"
            multiline
          />

          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            value={dadosFormulario.dataNascimento}
            onChangeText={(text) => handleInputChange('dataNascimento', text)}
            placeholder="DD/MM/AAAA"
          />
          {loading ? (
             <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 20 }} />
          ) : (
            <Button title={isEditiing ? 'Editar Cliente' : "Cadastrar Cliente"} onPress={handleSubmit} />
          )}
          
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
});
