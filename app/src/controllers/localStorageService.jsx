import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEY = '@produtos';




export async function salvarProdutoLocal(produtos){
    try{
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        const lista = data ? JSON.parse(data) : []

        lista.push(produtos)
        console.log(lista)

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
    }catch(e){
        console.log('Erro ao salvar produto', e)
    }
}


export async function carregarLocal(){
    try{
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) :[]
    }catch(e){
        console.log('Erro ao carregar dados locais', e);
        return [];
    }
    
}