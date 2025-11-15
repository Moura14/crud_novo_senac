import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { loginController } from "../controllers/loginController";


export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
   const result = await loginController(email, senha);
   if(result.success){
      alert('Login realizado com sucesso')
   }else{
      alert('Erro ao fazer login')
   }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
        <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.conta}>Ainda não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
           
      </View>
    </KeyboardAvoidingView>
      
  );
}

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    padding: 30,
    marginTop: 90,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#000000ff",
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 40,
  },
  buttonText: {
    color: "#ffffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  conta: {
    marginTop: 20,
    fontSize: 15,
    padding: 10

  }
});
