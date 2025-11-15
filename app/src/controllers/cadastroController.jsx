import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config';


export async function cadastroController(email, senha){
    try{
        const userCredential = await createUserWithEmailAndPassword(auth,email, senha)
        const user = userCredential.user;
        console.log('Usário criado com sucesso', user.uid)
        return {success: true, user}
    }catch(e){
        console.log('Erro ao cadastrar', error.message)
        return { success: false, message: error.message };
    }

}