import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { auth } from '../../../config';

const db = getFirestore();


export async function cadastroController(email, senha, nomeCompleto){
    try{
        const userCredential = await createUserWithEmailAndPassword(auth,email, senha)
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
            nomeCompleto,
            createdAt: new Date()
        });
        console.log('Usário criado com sucesso', user.uid)
        return {success: true, user}
    }catch(e){
        console.log('Erro ao cadastrar', e.message)
        return { success: false, message: e.message };
    }

}