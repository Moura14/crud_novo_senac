import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cadastrarCliente, editarCliente } from '../controllers/clienteController';


export default function ClienteForm({navigation, route}) {
  
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState('');
  const [enderecoData, setEnderecoData] = useState(null);
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [uf, setUf] = useState('');

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
    
      const missing = [];
      if (!dadosFormulario.nome || !dadosFormulario.nome.toString().trim()) missing.push('Nome');
      if (!dadosFormulario.email || !dadosFormulario.email.toString().trim()) missing.push('Email');
      if (!dadosFormulario.telefone || !dadosFormulario.telefone.toString().trim()) missing.push('Telefone');
      if (!dadosFormulario.dataNascimento || !dadosFormulario.dataNascimento.toString().trim()) missing.push('Data de Nascimento');

      if (missing.length) {
        Alert.alert('Campos obrigatórios', `Preencha os campos: ${missing.join(', ')}`);
        return;
      }

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

  async function fetchEndereco(cep) {
    try{
      setLoading(true);
      const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await result.json();
    
    setEnderecoData(data.endereco);
    setLogradouro(data.logradouro)
    setBairro(data.bairro)
    setEstado(data.estado)
    setUf(data.uf)

    }catch(error){
      alert('Erro ao buscar endereço:', error);
    }finally{
      setLoading(false);
    }
    
  }
  
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

   function formatarCEP(text) {
  return text
    .replace(/\D/g, "")          
    .replace(/(\d{5})(\d)/, "$1-$2") 
    .slice(0, 9);            
}



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

          <Text style={styles.label}>CEP</Text>
          <View style={styles.enderecoContainer}>
            <TextInput
              style={styles.enderecoInput}
              value={dadosFormulario.endereco}
              onChangeText={(text) => {
                const cepFormatado = formatarCEP(text);
                handleInputChange('endereco', cepFormatado)}
              }
              placeholder="CEP"
              keyboardType="numeric"
              multiline
            />
            {loading ? (
              <ActivityIndicator size="small" color="#4A90E2" style={{ marginTop: 8 }} />
            ) : (
              <TouchableOpacity style={styles.iconButton} onPress={() => fetchEndereco(dadosFormulario.endereco)}>
              <Ionicons name="search" size={20} color="#4A90E2" />
            </TouchableOpacity>
            )}
          </View>

          <Text style={styles.label}>Endereço</Text>
          <View style={styles.enderecoContainer}>
            <TextInput
              style={styles.enderecoInput}
              value={logradouro}
              onChangeText={setLogradouro}
              placeholder="Endereço"
              multiline
            />
          </View>

          <Text style={styles.label}>Bairro</Text>
          <View style={styles.enderecoContainer}>
            <TextInput
              style={styles.enderecoInput}
              value={bairro}
              onChangeText={setBairro}
              placeholder="Bairro"
              multiline
            />
          </View>

           <Text style={styles.label}>Estado</Text>
          <View style={styles.enderecoContainer}>
            <TextInput
              style={styles.enderecoInput}
              value={estado}
              onChangeText={setEstado}
              placeholder="Estado"
              multiline
            />
          </View>

          <Text style={styles.label}>UF</Text>
          <View style={styles.enderecoContainer}>
            <TextInput
              style={styles.enderecoInput}
              value={uf}
              onChangeText={setUf}
              placeholder="UF"
              multiline
            />
          </View>
         

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
  enderecoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  enderecoInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  }
});
