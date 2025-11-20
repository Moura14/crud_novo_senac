import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";


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


export async function listarClientes() {
    const user = getAuth().currentUser;
    if(!user) return [];

    const clienteRef = collection(db, 'users', user.uid, 'clientes');
    const snapshot = await getDocs(clienteRef);

    const clientes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    return clientes;
}

