import { combineReducers, configureStore } from '@reduxjs/toolkit';
import etudiantReducer from './etudiant/etudiantSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    etudiant: etudiantReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};



const persistedReducer = persistReducer(persistConfig, rootReducer);





export const store = configureStore({
    reducer: 
        persistedReducer
        ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
