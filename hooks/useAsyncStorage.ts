import AsyncStorage from '@react-native-async-storage/async-storage';

async function storeData(key: string, value: string) {
    try {
        AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error(e);
    }
}

async function getData(key: string) {
    try {
        const value = AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (e) {
        console.error(e);
    }
}

export function useAsyncStorage() {
    return { storeData, getData };
}