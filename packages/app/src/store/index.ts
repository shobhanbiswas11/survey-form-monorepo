import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { formReducer } from "features/form";
import { formPageReduce } from "features/FormPage";
import { questionReducer } from "features/questions";
import { uiReducer } from "features/UI";
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    form: formReducer,
    entities: combineReducers({
      questions: questionReducer,
      formPage: formPageReduce,
    }),
    ui: uiReducer,
  },
  middleware: [listenerMiddleware.middleware, ...getDefaultMiddleware()],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

declare global {
  interface Window {
    _store: typeof store;
  }
}
window._store = store;
