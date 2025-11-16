import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config';


export async function loginController(email, senha){
   try{
    const userCredential = await signInWithEmailAndPassword(auth, email, senha)
    const user = userCredential.user;
    console.log('Login realizado com sucesso', user.uid)
   await AsyncStorage.setItem('TokenUser', user.uid)
    return {success: true, user}
   }catch(error){
    console.log("Erro no login:", error.message);
     return { success: false, message: error.message };
   }
}
