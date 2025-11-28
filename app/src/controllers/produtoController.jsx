import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { carregarLocal, salvarProdutoLocal } from '../controllers/localStorageService';


const db = getFirestore();


export async function cadastrarProduto(nome, descricao, categoria, telefone, preco) {
    const user = getAuth().currentUser;

    if(!user) return null;

    const ref = collection(db, 'users', user.uid, 'produtos');

    const produto = {
        nome, 
        descricao,
        categoria,
        telefone,
        preco, 
        createdAt: new Date()
    }

    const docRef = await addDoc(ref, produto);


    const produtoId = {id: docRef.id, ...produto}

    await salvarProdutoLocal(produtoId)

    return produtoId;
}

export async function listarProdutos() {
    const user = getAuth().currentUser;
    if(!user) return [];

    const produtosRef = collection(db, 'users', user.uid, 'produtos');
    const snapshot = await getDocs(produtosRef);

    const produtos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));


    await carregarLocal();

    console.log('[Debug] Usuário atual', getAuth().currentUser)
    console.log("[DEBUG] LOCAL STORAGE ATUAL ->", await carregarLocal());


    return produtos;
}

export async function deletarProduto(produtoId) {
    const user = getAuth().currentUser;

    if(!user) return null;

    const produtoRef = doc(db, 'users', user.uid, 'produtos', produtoId);

    await deleteDoc(produtoRef);
    console.log('Excluído com sucesso');
    return true;
}


export async function editarProduto(produtoId, nome, descricao, categoria, preco){
    const user = getAuth().currentUser;
    
    if(!user) return null;

    const produtoRef = doc(db, 'users', user.uid,'produtos', produtoId);

    await updateDoc(produtoRef, {
            nome,
            descricao,
            categoria,
            preco,
            updateAt: new Date().toISOString()

    });

    console.log('Produto atualizado')
    return true;
}