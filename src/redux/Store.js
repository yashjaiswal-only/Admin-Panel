import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import userReducer from './UserRedux';
import productReducer from "./productRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer=combineReducers({
    user:userReducer,product:productReducer
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  //combined both to persist

export const store= configureStore({    //this should be = not =()=>
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor=persistStore(store);

//store get all the reducer and export