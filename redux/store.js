import { configureStore, combineReducers } from "@reduxjs/toolkit";  
import userReducer from "./slices/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const reducers = combineReducers({
    user : userReducer,
});

const persistConfig = {
    key : "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);




export const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false,
    }),
    devTools : process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store);

export default store;