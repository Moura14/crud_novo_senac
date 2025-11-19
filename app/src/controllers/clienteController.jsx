import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";


const db = getFirestore();


export async function cadastrarCliente(nome, email, telefone, endereco, dataNascimento){
     const user = getAuth().currentUser;

    if(!user) return null;


    const ref = collection(db, 'users', user.uid, 'clientes');

    const docRef = await addDoc(ref, {
        nome,
        email,
        telefone,
        endereco,
        dataNascimento,
        createdAt: new Date()
    });

    return {success: true, id: docRef.id}
}


