import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";


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

    return docRef.id;
}

