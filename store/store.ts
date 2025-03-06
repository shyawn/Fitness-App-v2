import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PERSIST,
  persistReducer,
  persistStore,
  // FLUSH,
  // PAUSE,
  // PURGE,
  // REGISTER,
  // REHYDRATE,
} from "redux-persist";
import workoutReducer from "./workoutPlan/workoutSlice";

const rootReducer = combineReducers({
  workout: workoutReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // version: 1,
  // storage: reduxStorage,
  // timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
        // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredPaths: ["register"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
