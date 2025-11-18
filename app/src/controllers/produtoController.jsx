import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";


const db = getFirestore();


export async function cadastrarProduto(nome, descricao, categoria, preco) {
    const user = getAuth().currentUser;

    if(!user) return null;

    const ref = collection(db, 'users', user.uid, 'produtos');

    const docRef = await addDoc(ref, {
        nome,
        descricao,
        categoria,
        preco,
        createdAt: new Date()
    });

    return docRef;
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

    return produtos;
}