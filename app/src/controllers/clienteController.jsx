import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";


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


export async function deletarCliente(clienteId) {
    const user = getAuth().currentUser;

    if(!user) return null;

    const clienteRef = doc(db, 'users', user.uid, 'clientes', clienteId);

    await deleteDoc(clienteRef);
    console.log('Excluído com sucesso');
    return true;
}


export async function editarCliente(clienteId, nome, email, telefone, endereco, dataNascimento){
    const user = getAuth().currentUser;

    if(!user) return null;

    const clienteRef = doc(db, 'users', user.uid, 'clientes', clienteId);

    await updateDoc(clienteRef, {
        nome,
        email,
        telefone,
        endereco,
        dataNascimento,
        updateAt: new Date().toISOString()
    });

    console.log('Cliente atualizado com sucesso')
    return true
}

export async function pesquisarEnderecoPorCep(cep) {
    try{
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if(!response.ok) throw new Error('Erro ao buscar o CEP');
        const data = await response.json();
        return data;
    }catch(error){
        console.log('Erro na pesquisa de CEP:', error);
        return null;
    }
}


