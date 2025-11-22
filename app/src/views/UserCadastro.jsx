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
  const [displayDate, setDisplayDate] = useState('');

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
  if (!cliente) return;

  const telefoneRaw = (cliente.telefone || '').toString().replace(/\D/g, '');
  const dateRaw = (cliente.dataNascimento || '').toString().replace(/\D/g, '').slice(0, 8);

  setDadosFormulario(prev => ({
    ...prev,
    ...cliente,
    telefone: telefoneRaw,
    dataNascimento: dateRaw, 
  }));

  setDisplayDate(formatDate(dateRaw));
}, [cliente]);


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


function formatDate(value) {
  const digits = (value || '').toString().replace(/\D/g, '').slice(0,8); // DDMMYYYY max 8
  if (digits.length === 0) return '';
  if (digits.length <= 2) return digits; // 'D' ou 'DD'
   if (digits.length <= 4) return `${digits.slice(0,2)}/${digits.slice(2)}`; // 'DD/MM'
  return `${digits.slice(0,2)}/${digits.slice(2,4)}/${digits.slice(4,8)}`; // 'DD/MM/YYYY'
}

  const handleInputChange = (key, value) => {
  setDadosFormulario(prevDados => ({
    ...prevDados,
    [key]: value
  }))
}

const handlePhoneChange = (text) => {
  const digits = text.replace(/\D/g, '');
  setDadosFormulario((prev) => ({
    ...prev,
    telefone: digits
  }));
};

  const handleDateChange = (text) => {
    const digits = text.replace(/\D/g, '').slice(0, 8); // DDMMYYYY
    setDadosFormulario(prev => ({
      ...prev,
      dataNascimento: digits
    }));
    setDisplayDate(formatDate(digits));
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 100}
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
            value={formatPhone(dadosFormulario.telefone)}
            onChangeText={(text) => handlePhoneChange(text)}
            placeholder="(DD) 9XXXX-XXXX"
            keyboardType="phone-pad"
            maxLength={15}
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
            value={displayDate}
            onChangeText={handleDateChange}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            maxLength={10}
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
});
