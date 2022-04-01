import {
  createListenerMiddleware,
  TypedStartListening,
} from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./index";

export const listenerMiddleware = createListenerMiddleware();
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListen =
  listenerMiddleware.startListening as AppStartListening;
